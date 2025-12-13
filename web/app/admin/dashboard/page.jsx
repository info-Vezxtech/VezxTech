'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FaStore, FaCheckCircle, FaClock, FaTimesCircle, FaSignOutAlt, FaEye, FaEdit, FaTrash, FaChartBar } from 'react-icons/fa'
import toast from 'react-hot-toast'

export default function AdminDashboard() {
  const router = useRouter()
  const [shops, setShops] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedShops, setSelectedShops] = useState([])
  const itemsPerPage = 10

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      router.push('/admin/login')
      return
    }

    fetchShops()
  }, [router])

  const fetchShops = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/shops`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setShops(data)
      }
    } catch (error) {
      console.error('Error fetching shops:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (shopId, status) => {
    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/shops/${shopId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      })

      if (response.ok) {
        toast.success(`Shop ${status} successfully`)
        fetchShops()
      }
    } catch (error) {
      toast.error('Failed to update status')
    }
  }

  const handleDelete = async (shopId) => {
    if (!confirm('Are you sure you want to delete this shop?')) return

    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/shops/${shopId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        toast.success('Shop deleted successfully')
        fetchShops()
      }
    } catch (error) {
      toast.error('Failed to delete shop')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    router.push('/admin/login')
  }

  const handleSelectShop = (shopId) => {
    setSelectedShops(prev => 
      prev.includes(shopId) 
        ? prev.filter(id => id !== shopId)
        : [...prev, shopId]
    )
  }

  const handleSelectAll = () => {
    if (selectedShops.length === filteredShops.length) {
      setSelectedShops([])
    } else {
      setSelectedShops(filteredShops.map(shop => shop._id))
    }
  }

  const handleBulkAction = async (action) => {
    if (selectedShops.length === 0) {
      toast.error('Please select shops first')
      return
    }

    if (!confirm(`Are you sure you want to ${action} ${selectedShops.length} shop(s)?`)) return

    try {
      const token = localStorage.getItem('adminToken')
      const promises = selectedShops.map(shopId =>
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/shops/${shopId}`, {
          method: action === 'delete' ? 'DELETE' : 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: action !== 'delete' ? JSON.stringify({ status: action }) : undefined
        })
      )

      await Promise.all(promises)
      toast.success(`Bulk ${action} completed successfully`)
      setSelectedShops([])
      fetchShops()
    } catch (error) {
      toast.error('Bulk action failed')
    }
  }

  const filteredShops = shops
    .filter(shop => filter === 'all' || shop.status === filter)
    .filter(shop => 
      searchTerm === '' || 
      shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shop.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shop.ownerName.toLowerCase().includes(searchTerm.toLowerCase())
    )

  const totalPages = Math.ceil(filteredShops.length / itemsPerPage)
  const paginatedShops = filteredShops.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const stats = {
    total: shops.length,
    pending: shops.filter(s => s.status === 'pending').length,
    approved: shops.filter(s => s.status === 'approved').length,
    rejected: shops.filter(s => s.status === 'rejected').length
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-text-light">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background-light">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-blue to-accent-aqua rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">V</span>
              </div>
              <div>
                <h1 className="text-2xl font-poppins font-bold text-text-dark">
                  VezxTech Admin
                </h1>
                <p className="text-sm text-text-light">Dashboard</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Stats */}
      <section className="py-8">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-text-light text-sm mb-1">Total Shops</p>
                  <p className="text-3xl font-bold text-text-dark">{stats.total}</p>
                </div>
                <FaStore className="text-4xl text-primary-blue opacity-20" />
              </div>
            </div>
            <div className="card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-text-light text-sm mb-1">Pending</p>
                  <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
                </div>
                <FaClock className="text-4xl text-yellow-600 opacity-20" />
              </div>
            </div>
            <div className="card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-text-light text-sm mb-1">Approved</p>
                  <p className="text-3xl font-bold text-green-600">{stats.approved}</p>
                </div>
                <FaCheckCircle className="text-4xl text-green-600 opacity-20" />
              </div>
            </div>
            <div className="card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-text-light text-sm mb-1">Rejected</p>
                  <p className="text-3xl font-bold text-red-600">{stats.rejected}</p>
                </div>
                <FaTimesCircle className="text-4xl text-red-600 opacity-20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="py-4">
        <div className="container-custom">
          <div className="card p-6 space-y-4">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              {/* Search */}
              <div className="flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="Search by name, category, or owner..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                />
              </div>

              {/* Status Filters */}
              <div className="flex flex-wrap gap-2">
                {['all', 'pending', 'approved', 'rejected'].map((status) => (
                  <button
                    key={status}
                    onClick={() => {
                      setFilter(status)
                      setCurrentPage(1)
                    }}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      filter === status
                        ? 'bg-primary-blue text-white'
                        : 'bg-gray-100 text-text-dark hover:bg-gray-200'
                    }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Bulk Actions */}
            {selectedShops.length > 0 && (
              <div className="flex items-center gap-3 p-3 bg-primary-blue/10 rounded-lg">
                <span className="text-sm font-medium text-text-dark">
                  {selectedShops.length} selected
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleBulkAction('approved')}
                    className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleBulkAction('rejected')}
                    className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleBulkAction('delete')}
                    className="px-3 py-1 bg-gray-700 text-white text-sm rounded hover:bg-gray-800"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Shop List */}
      <section className="py-4">
        <div className="container-custom">
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedShops.length === filteredShops.length && filteredShops.length > 0}
                        onChange={handleSelectAll}
                        className="rounded"
                      />
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-text-dark">Shop Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-text-dark">Category</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-text-dark">Owner</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-text-dark">Contact</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-text-dark">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-text-dark">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-text-dark">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {paginatedShops.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-6 py-12 text-center text-text-light">
                        No shops found
                      </td>
                    </tr>
                  ) : (
                    paginatedShops.map((shop) => (
                    <tr key={shop._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedShops.includes(shop._id)}
                          onChange={() => handleSelectShop(shop._id)}
                          className="rounded"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-text-dark">{shop.name}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-accent-aqua bg-opacity-10 text-accent-aqua rounded text-sm">
                          {shop.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-text-dark">{shop.ownerName}</td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-text-dark">{shop.phone}</div>
                        <div className="text-sm text-text-light">{shop.email}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          shop.status === 'approved' ? 'bg-green-100 text-green-800' :
                          shop.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {shop.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-text-light">
                        {new Date(shop.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          {shop.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleStatusChange(shop._id, 'approved')}
                                className="p-2 text-green-600 hover:bg-green-50 rounded"
                                title="Approve"
                              >
                                <FaCheckCircle />
                              </button>
                              <button
                                onClick={() => handleStatusChange(shop._id, 'rejected')}
                                className="p-2 text-red-600 hover:bg-red-50 rounded"
                                title="Reject"
                              >
                                <FaTimesCircle />
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => handleDelete(shop._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded"
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="px-6 py-4 border-t flex items-center justify-between">
                <div className="text-sm text-text-light">
                  Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredShops.length)} of {filteredShops.length} shops
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  
                  {[...Array(totalPages)].map((_, i) => {
                    const page = i + 1
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-3 py-1 border rounded ${
                            currentPage === page
                              ? 'bg-primary-blue text-white'
                              : 'hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      )
                    } else if (page === currentPage - 2 || page === currentPage + 2) {
                      return <span key={page}>...</span>
                    }
                    return null
                  })}
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
