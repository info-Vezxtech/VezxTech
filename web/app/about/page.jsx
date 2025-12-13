import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Logo from '../../components/Logo'
import { FaLightbulb, FaHeart, FaRocket, FaBolt, FaUsers, FaAward } from 'react-icons/fa'

export const metadata = {
  title: 'About Us - VezxTech',
  description: 'Learn about VezxTech - two passionate students on a mission to digitize local businesses'
}

export default function AboutPage() {
  const values = [
    {
      icon: <FaLightbulb />,
      title: 'Innovation',
      description: 'We leverage the latest web technologies to create modern, fast, and secure websites'
    },
    {
      icon: <FaHeart />,
      title: 'Passion',
      description: 'We genuinely care about helping local businesses succeed in the digital world'
    },
    {
      icon: <FaBolt />,
      title: 'Speed',
      description: 'We understand time is money. Quick turnaround without compromising quality'
    },
    {
      icon: <FaUsers />,
      title: 'Partnership',
      description: 'We don\'t just build websites, we build lasting relationships with our clients'
    },
    {
      icon: <FaAward />,
      title: 'Quality',
      description: 'Premium design and functionality at prices local businesses can actually afford'
    },
    {
      icon: <FaRocket />,
      title: 'Growth',
      description: 'Your success is our success. We help you grow your business online'
    }
  ]

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-background-light to-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center mb-8">
              <Logo className="h-20 w-auto" />
            </div>
            <h1 className="heading-1 mb-6">
              About <span className="gradient-text">VezxTech</span>
            </h1>
            <p className="text-body mb-8">
              We're engineering students building a startup to help local shops establish their online presence while gaining real-world experience
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="heading-2 mb-6">Our Story</h2>
                <div className="space-y-4 text-text-light">
                  <p>
                    VezxTech started as an idea among engineering students who wanted to gain practical 
                    experience while making a real impact. We noticed that many local shops in our area 
                    struggled to reach customers online because professional websites seemed too expensive 
                    or complicated.
                  </p>
                  <p>
                    As we learned web development in college, we decided to put our skills to work. We 
                    started reaching out to local businesses - salons, clinics, electronics shops, boutiques - 
                    offering them affordable, professional websites that could help them grow their customer base.
                  </p>
                  <p>
                    We've successfully completed 2-3 projects during our college journey so far, and each one 
                    has taught us invaluable lessons about building websites that truly serve small businesses. 
                    Now, we're turning this into a full-fledged startup to help more local shops thrive in the digital age.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-primary-blue to-accent-aqua rounded-2xl p-8 flex items-center justify-center text-white">
                  <div className="text-center">
                    <div className="text-6xl font-bold mb-4">3</div>
                    <div className="text-xl">Projects Completed</div>
                    <div className="mt-8 text-4xl font-bold mb-2">∞</div>
                    <div className="text-lg">Learning & Growing</div>
                    <div className="mt-8 text-sm opacity-90">Engineering Students</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding bg-background-light">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-2 mb-6">Our Mission</h2>
            <p className="text-xl text-text-dark mb-8">
              To gain hands-on experience in web development while helping local shops establish an 
              affordable, professional online presence that connects them with more customers.
            </p>
            <div className="card p-8 text-left">
              <h3 className="text-2xl font-poppins font-semibold mb-4">We Believe...</h3>
              <ul className="space-y-3 text-text-light">
                <li className="flex items-start space-x-3">
                  <span className="text-accent-aqua mt-1">✓</span>
                  <span>Every business deserves a professional website, regardless of their budget</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-accent-aqua mt-1">✓</span>
                  <span>Technology should be accessible and easy to use for everyone</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-accent-aqua mt-1">✓</span>
                  <span>Small businesses are the backbone of our economy and deserve our support</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-accent-aqua mt-1">✓</span>
                  <span>Quality and affordability can coexist</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-accent-aqua mt-1">✓</span>
                  <span>Building lasting relationships is more important than one-time transactions</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">Our Values</h2>
            <p className="text-body max-w-2xl mx-auto">
              These core principles guide everything we do at VezxTech
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="card p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-blue to-accent-aqua rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-white text-2xl">
                    {value.icon}
                  </div>
                </div>
                <h3 className="text-xl font-poppins font-semibold text-text-dark mb-2">
                  {value.title}
                </h3>
                <p className="text-text-light">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-background-light">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">Meet the Team</h2>
            <p className="text-body max-w-2xl mx-auto">
              Two students with a shared vision of making the web accessible to all
            </p>
          </div>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="card p-8 text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-primary-blue to-accent-aqua rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-5xl">S</span>
              </div>
              <h3 className="text-2xl font-poppins font-semibold text-text-dark mb-2">
                Shreyas M E
              </h3>
              <p className="text-accent-aqua font-medium mb-3">Team Lead & Web Developer</p>
              <p className="text-text-light">
                Engineering student with expertise in web development. Passionate about building 
                scalable solutions and leading the technical vision of VezxTech.
              </p>
            </div>
            <div className="card p-8 text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-secondary-indigo to-primary-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-5xl">T</span>
              </div>
              <h3 className="text-2xl font-poppins font-semibold text-text-dark mb-2">
                Thanushree K P
              </h3>
              <p className="text-accent-aqua font-medium mb-3">Co Team Member & Web Developer</p>
              <p className="text-text-light">
                Engineering student specializing in web technologies. Dedicated to creating 
                beautiful, functional websites that help local businesses thrive online.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="heading-2 mb-8 text-center">Why Choose VezxTech?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="card p-6">
                <h3 className="font-poppins font-semibold text-lg text-text-dark mb-2">
                  We Understand Your Business
                </h3>
                <p className="text-text-light text-sm">
                  We've worked with dozens of local businesses. We know what works and what doesn't 
                  for different industries.
                </p>
              </div>
              <div className="card p-6">
                <h3 className="font-poppins font-semibold text-lg text-text-dark mb-2">
                  Truly Affordable
                </h3>
                <p className="text-text-light text-sm">
                  As students, we have lower overhead costs, which means better prices for you 
                  without compromising quality.
                </p>
              </div>
              <div className="card p-6">
                <h3 className="font-poppins font-semibold text-lg text-text-dark mb-2">
                  Personal Touch
                </h3>
                <p className="text-text-light text-sm">
                  You work directly with us, not account managers. We're accessible, responsive, 
                  and genuinely invested in your success.
                </p>
              </div>
              <div className="card p-6">
                <h3 className="font-poppins font-semibold text-lg text-text-dark mb-2">
                  Latest Technology
                </h3>
                <p className="text-text-light text-sm">
                  We use cutting-edge tools and frameworks to build fast, secure, and scalable 
                  websites that will serve you for years.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding gradient-bg">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-4">
              Let's Build Something Great Together
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Ready to take your business online? We're here to help every step of the way.
            </p>
            <a href="/contact" className="bg-white text-primary-blue px-8 py-4 rounded-lg font-medium hover:bg-gray-100 transition-all duration-300 shadow-xl inline-block">
              Get In Touch
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
