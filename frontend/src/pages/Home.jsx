import { Link } from 'react-router-dom';
import { 
  Shield, Users, Lock, Zap, CheckCircle, ArrowRight, 
  Heart, Clock, Phone, MapPin, Star, Award, 
  Stethoscope, Calendar, Activity, PawPrint 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: Shield,
      title: 'Secure & Safe',
      description: 'Advanced security protocols to protect your pet\'s medical records and personal information'
    },
    {
      icon: Users,
      title: 'Expert Veterinarians',
      description: 'Qualified and experienced veterinary professionals dedicated to your pet\'s wellbeing'
    },
    {
      icon: Clock,
      title: '24/7 Emergency Care',
      description: 'Round-the-clock emergency services for critical situations and urgent medical needs'
    },
    {
      icon: Calendar,
      title: 'Easy Booking',
      description: 'Simple online appointment scheduling system with instant confirmations'
    }
  ];

  const services = [
    {
      icon: Stethoscope,
      title: 'General Health Checkups',
      description: 'Comprehensive health examinations to keep your pets in optimal condition',
      price: 'From LKR 2,500'
    },
    {
      icon: Activity,
      title: 'Vaccinations',
      description: 'Complete vaccination programs following international standards',
      price: 'From LKR 1,800'
    },
    {
      icon: Heart,
      title: 'Surgery & Operations',
      description: 'Advanced surgical procedures with modern equipment and techniques',
      price: 'From LKR 15,000'
    },
    {
      icon: PawPrint,
      title: 'Grooming Services',
      description: 'Professional pet grooming and hygiene maintenance services',
      price: 'From LKR 3,500'
    }
  ];

  const teamMembers = [
    {
      name: 'Dr. Samanthi Perera',
      position: 'Chief Veterinarian',
      experience: '15+ years',
      image: 'samanthi.jpg',
      specialization: 'Small Animal Medicine'
    },
    {
      name: 'Dr. Rukshan Silva',
      position: 'Senior Veterinarian',
      experience: '12+ years',
      image: 'rukshan.jpg',
      specialization: 'Emergency Care'
    },
    {
      name: 'Dr. Niluka Fernando',
      position: 'Veterinary Surgeon',
      experience: '8+ years',
      image: 'niluka.jpg',
      specialization: 'Surgical Procedures'
    }
  ];

  const testimonials = [
    {
      name: 'Priya Rajapaksa',
      location: 'Colombo',
      rating: 5,
      comment: 'Exceptional care for my Golden Retriever. The staff is professional and genuinely cares about the animals.',
      pet: 'Max (Golden Retriever)'
    },
    {
      name: 'Kavinda Mendis',
      location: 'Kandy',
      rating: 5,
      comment: 'Best veterinary clinic in the area. They saved my cat during an emergency. Highly recommended!',
      pet: 'Whiskers (Persian Cat)'
    },
    {
      name: 'Sanjeewa Kumara',
      location: 'Galle',
      rating: 5,
      comment: 'Professional service and modern facilities. My pets always receive the best care here.',
      pet: 'Buddy & Luna (Dogs)'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 overflow-hidden">
  {/* Background Image */}
  <div 
    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
    style={{
      backgroundImage: "url('petbg.jpg')",
      backgroundBlendMode: 'overlay'
    }}
  ></div>
  
  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-black/40"></div>
  
  
  {/* Main Content */}
  <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
    <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full">
      
      {/* Left Content */}
      <div className="text-white space-y-6 lg:space-y-8 text-center lg:text-left order-2 lg:order-1">
        
        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
          Your Pet's Health is Our{' '}
          <span className="text-yellow-400 relative">
            Priority
            <svg className="absolute -bottom-2 left-0 w-full h-3 text-yellow-400/50" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0,8 Q50,0 100,8" stroke="currentColor" strokeWidth="2" fill="none"/>
            </svg>
          </span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-lg sm:text-xl lg:text-2xl text-blue-100 leading-relaxed max-w-2xl mx-auto lg:mx-0">
          Sri Lanka's most trusted veterinary clinic providing comprehensive pet care 
          with modern facilities, cutting-edge technology, and compassionate professionals.
        </p>
        
        {/* Stats */}
        <div className="flex flex-wrap justify-center lg:justify-start gap-6 sm:gap-8 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/20">
            <p className="text-2xl sm:text-3xl font-bold text-yellow-400">5000+</p>
            <p className="text-sm text-blue-100">Happy Pets</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/20">
            <p className="text-2xl sm:text-3xl font-bold text-yellow-400">8+</p>
            <p className="text-sm text-blue-100">Years Experience</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/20">
            <p className="text-2xl sm:text-3xl font-bold text-yellow-400">24/7</p>
            <p className="text-sm text-blue-100">Emergency Care</p>
          </div>
        </div>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
          {user ? (
            <Link
              to={user.role === 'admin' ? '/admin/dashboard' : '/dashboard'}
              className="group inline-flex items-center justify-center px-8 py-4 bg-yellow-500 text-gray-900 font-semibold rounded-full hover:bg-yellow-400 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform"
            >
              Go to Dashboard
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : (
            <>
              <Link
                to="/register"
                className="group inline-flex items-center justify-center px-8 py-4 bg-yellow-500 text-gray-900 font-semibold rounded-full hover:bg-yellow-400 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform"
              >
                Book Appointment
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/login"
                className="group inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full border-2 border-white/30 hover:bg-white hover:text-blue-700 transition-all duration-300 hover:scale-105 transform"
              >
                Sign In
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </>
          )}
        </div>
        
        {/* Trust Indicators */}
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-6 text-sm text-blue-200">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            <span>Certified Veterinarians</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>Same Day Appointments</span>
          </div>
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4" />
            <span>Compassionate Care</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* About Us Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                About <span className="text-blue-600">PetHub</span>
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Established in 2015, PetHub has been Sri Lanka's leading veterinary clinic, 
                providing exceptional care for pets across the island. Our state-of-the-art 
                facility in Colombo serves as the hub for comprehensive pet healthcare services.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                We combine traditional veterinary expertise with modern technology to ensure 
                your beloved pets receive the best possible care. Our mission is to enhance 
                the bond between pets and their families through superior healthcare services.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <h3 className="text-3xl font-bold text-blue-600">8+</h3>
                  <p className="text-gray-600">Years of Excellence</p>
                </div>
                <div className="text-center">
                  <h3 className="text-3xl font-bold text-blue-600">15+</h3>
                  <p className="text-gray-600">Expert Veterinarians</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="catdog.jpg" 
                alt="PetHub clinic interior" 
                className="rounded-2xl shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our <span className="text-blue-600">Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive veterinary services designed to keep your pets healthy, 
              happy, and thriving throughout their lives.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-100">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
                  <service.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {service.description}
                </p>
                <p className="text-blue-600 font-semibold">
                  {service.price}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Why Choose PetHub?
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              We're committed to providing the highest standard of veterinary care 
              with modern facilities and compassionate service.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center text-white">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 text-white rounded-full mb-4">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  {feature.title}
                </h3>
                <p className="text-blue-100">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Meet Our <span className="text-blue-600">Expert Team</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our experienced veterinarians are dedicated to providing the best care 
              for your beloved pets with compassion and expertise.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-120 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 font-medium mb-1">
                    {member.position}
                  </p>
                  <p className="text-gray-600 mb-2">
                    Experience: {member.experience}
                  </p>
                  <p className="text-sm text-gray-500">
                    Specialization: {member.specialization}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What Pet Owners <span className="text-blue-600">Say</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Read testimonials from satisfied pet owners who trust us with their 
              beloved companions' health and wellbeing.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">
                  "{testimonial.comment}"
                </p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-900">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {testimonial.location} • Owner of {testimonial.pet}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Care Section */}
      <section className="py-20 bg-red-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              24/7 Emergency Care
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Pet emergencies don't wait for business hours. Our emergency veterinary 
              services are available around the clock to handle critical situations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center gap-2 text-xl">
                <Phone className="w-6 h-6" />
                <span className="font-semibold">Emergency Hotline: +94 77 123 4567</span>
              </div>
              <Link
                to="/emergency"
                className="inline-flex items-center px-8 py-4 bg-white text-red-600 font-semibold rounded-full hover:bg-gray-100 transition-colors duration-300"
              >
                Emergency Contact
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Contact Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Visit Our <span className="text-blue-600">Clinic</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Conveniently located in the heart of Colombo with easy access 
              and ample parking facilities.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <MapPin className="w-6 h-6 text-blue-600" />
                  <div>
                    <p className="font-semibold">Address</p>
                    <p className="text-gray-600">123 Galle Road, Colombo 03, Sri Lanka</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="w-6 h-6 text-blue-600" />
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p className="text-gray-600">+94 11 234 5678</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Clock className="w-6 h-6 text-blue-600" />
                  <div>
                    <p className="font-semibold">Opening Hours</p>
                    <p className="text-gray-600">Mon-Fri: 8:00 AM - 8:00 PM</p>
                    <p className="text-gray-600">Sat-Sun: 9:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-300 rounded-xl h-64 lg:h-auto flex items-center justify-center">
              <p className="text-gray-600">Map Integration Area</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Give Your Pet the Best Care?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join thousands of satisfied pet owners who trust PetHub for their 
            companions' health and wellbeing. Book your appointment today!
          </p>
          {!user && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="inline-flex items-center px-8 py-4 bg-yellow-500 text-gray-900 font-semibold rounded-full hover:bg-yellow-400 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Create Account & Book
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-4 bg-transparent text-white font-semibold rounded-full border-2 border-white hover:bg-white hover:text-blue-700 transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;