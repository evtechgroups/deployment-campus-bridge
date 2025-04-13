
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BookOpen, 
  Code, 
  GraduationCap, 
  Users, 
  BrainCircuit, 
  BarChart4, 
  ChevronRight,
  ArrowRight,
  LogIn,
  UserPlus
} from 'lucide-react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const features = [
  {
    title: "Academic LMS",
    description: "Access courses, assignments, and educational resources all in one place.",
    icon: <BookOpen className="h-10 w-10 text-campus-600" />,
    path: "/academic",
    bgImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800"
  },
  {
    title: "Coding Platform",
    description: "Practice coding with an integrated editor and compiler supporting multiple languages.",
    icon: <Code className="h-10 w-10 text-campus-600" />,
    path: "/coding",
    bgImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800"
  },
  {
    title: "AI Assistant",
    description: "Get real-time coding hints, suggestions, and personalized learning recommendations.",
    icon: <BrainCircuit className="h-10 w-10 text-campus-600" />,
    path: "/dashboard",
    bgImage: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=800"
  },
  {
    title: "Group Coding Rooms",
    description: "Collaborate in real-time with peers on coding projects and assignments.",
    icon: <Users className="h-10 w-10 text-campus-600" />,
    path: "/dashboard",
    bgImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800"
  },
  {
    title: "Performance Analytics",
    description: "Track your progress with detailed analytics and skill heatmaps.",
    icon: <BarChart4 className="h-10 w-10 text-campus-600" />,
    path: "/progress",
    bgImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800"
  },
  {
    title: "Faculty Portal",
    description: "For educators to manage courses, assignments, and student progress.",
    icon: <GraduationCap className="h-10 w-10 text-campus-600" />,
    path: "/faculty",
    bgImage: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=800"
  }
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Computer Science Student",
    content: "Campus Bridge has transformed my learning experience. The integrated coding platform helped me practice concepts right after learning them in lectures.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150"
  },
  {
    name: "Prof. Michael Chen",
    role: "Faculty Member",
    content: "The faculty portal makes it incredibly easy to track student progress and provide personalized guidance. I've seen a 30% improvement in student engagement.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150"
  },
  {
    name: "David Rodriguez",
    role: "Tech Industry Recruiter",
    content: "Students from universities using Campus Bridge consistently demonstrate stronger practical coding skills during interviews.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150"
  }
];

const Index = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-rotate features
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      {/* Add Navbar */}
      <Navbar />
      
      {/* Hero Section with Video Background and Updated Background Color */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Fallback background image with new gradient background color until video loads */}
        {!isVideoLoaded && (
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url("./background.webp")`,
              filter: 'brightness(0.68)'
            }}
          />
        )}
        
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className={`absolute w-full h-full object-cover transition-opacity duration-700 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
          style={{ filter: 'brightness(0.4)' }}
          onLoadedData={handleVideoLoad}
        >
          <source src="https://cdn.gpteng.co/cache/c75f5a4a-58c0-4f40-8267-d6d6be10dda3/video.mp4" type="video/mp4" />
        </video>
        
        <div className="container relative z-10 mx-auto px-4 py-16 md:py-24 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              Campus Bridge
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Your integrated platform for academic success and coding excellence
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-campus-600 hover:bg-campus-700 transition-all duration-300 transform hover:scale-105" asChild>
                <Link to="/dashboard">Student Dashboard</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 transition-all duration-300 transform hover:scale-105" asChild>
                <Link to="/faculty">Faculty Portal</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 transition-all duration-300 transform hover:scale-105" asChild>
                <Link to="/admin">Admin Portal</Link>
              </Button>
            </div>
            <div className="mt-8 flex justify-center gap-4">
              <Button variant="ghost" className="text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300" onClick={handleLoginClick}>
                <span className="flex items-center gap-2">
                  <LogIn size={18} /> Login
                </span>
              </Button>
              <Button variant="ghost" className="text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300" onClick={handleSignupClick}>
                <span className="flex items-center gap-2">
                  <UserPlus size={18} /> Sign Up
                </span>
              </Button>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <div className="w-8 h-12 border-2 border-white rounded-full flex justify-center">
            <motion.div 
              className="w-1 h-3 bg-white rounded-full mt-2"
              animate={{ y: [0, 16, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section with 3D Carousel */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-white">All-in-One Education Platform</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Campus Bridge integrates academic learning with practical coding skills to create a comprehensive educational experience.
            </p>
          </motion.div>

          <div className="mb-16">
            <Carousel className="w-full max-w-5xl mx-auto">
              <CarouselContent>
                {features.map((feature, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-2 h-full">
                      <Card className="overflow-hidden h-full border-none shadow-2xl bg-black/40 backdrop-blur-sm text-white hover:shadow-[0_0_30px_rgba(123,97,255,0.3)] transition-all duration-500">
                        <div 
                          className="h-40 bg-cover bg-center" 
                          style={{ backgroundImage: `url(${feature.bgImage})` }}
                        />
                        <CardHeader>
                          <div className="rounded-full w-16 h-16 flex items-center justify-center bg-campus-900/50 backdrop-blur-sm mb-4 border border-campus-600/50">
                            {feature.icon}
                          </div>
                          <CardTitle className="text-2xl text-white">{feature.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="text-base text-gray-300">
                            {feature.description}
                          </CardDescription>
                        </CardContent>
                        <CardFooter>
                          <Button variant="ghost" size="sm" className="gap-1 text-campus-400 hover:text-campus-300 hover:bg-campus-900/50" asChild>
                            <Link to={feature.path}>
                              Learn more <ChevronRight size={16} />
                            </Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center mt-8 gap-4">
                <CarouselPrevious className="relative static bg-campus-700 hover:bg-campus-600 text-white border-none" />
                <CarouselNext className="relative static bg-campus-700 hover:bg-campus-600 text-white border-none" />
              </div>
            </Carousel>
          </div>

          {/* Feature Showcase */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="bg-black/30 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl border border-white/10 max-w-6xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div 
                className="h-80 lg:h-auto bg-cover bg-center transition-all duration-1000 ease-in-out"
                style={{ backgroundImage: `url(${features[activeFeature].bgImage})` }}
              />
              <div className="p-8 lg:p-12 flex items-center">
                <div>
                  <div className="inline-block p-3 bg-campus-900/70 rounded-xl mb-6">
                    {features[activeFeature].icon}
                  </div>
                  <h3 className="text-3xl font-bold mb-4 text-white">{features[activeFeature].title}</h3>
                  <p className="text-lg text-gray-300 mb-6">{features[activeFeature].description}</p>
                  <p className="mb-8 text-gray-400">
                    Experience our comprehensive {features[activeFeature].title.toLowerCase()} module designed to enhance your educational journey.
                  </p>
                  <Button className="bg-campus-600 hover:bg-campus-700 transition-all duration-300" asChild>
                    <Link to={features[activeFeature].path} className="flex items-center gap-2">
                      Explore {features[activeFeature].title} <ArrowRight size={16} />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex justify-center py-6 bg-black/50">
              {features.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 mx-2 rounded-full transition-all duration-300 ${
                    activeFeature === index ? 'bg-campus-500 scale-125' : 'bg-gray-600'
                  }`}
                  onClick={() => setActiveFeature(index)}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-gray-800 to-campus-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-white">What Our Users Say</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Join thousands of students and educators already transforming the educational experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-none shadow-xl bg-black/30 backdrop-blur-sm text-white">
                  <CardContent className="p-6">
                    <div className="mb-4">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-yellow-500">★</span>
                      ))}
                    </div>
                    <p className="mb-6 text-gray-300">{testimonial.content}</p>
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                        <img 
                          src={testimonial.avatar} 
                          alt={testimonial.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-gray-400">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-campus-800 to-campus-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Elevate Your Learning Experience?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Join thousands of students and faculty already using Campus Bridge to transform their educational journey.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-white text-campus-900 hover:bg-gray-100 transition-all duration-300 transform hover:scale-105" 
                asChild
              >
                <Link to="/signup" className="flex items-center gap-2">
                  Get Started Now <ArrowRight size={18} />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10 transition-all duration-300 transform hover:scale-105" 
                asChild
              >
                <Link to="/dashboard">
                  Explore Platform
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Campus Bridge</h3>
              <p className="text-gray-400">
                Integrated Academic LMS + Coding Skill Development Platform
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/dashboard" className="text-gray-400 hover:text-white transition-colors">Dashboard</Link></li>
                <li><Link to="/academic" className="text-gray-400 hover:text-white transition-colors">Academic Courses</Link></li>
                <li><Link to="/coding" className="text-gray-400 hover:text-white transition-colors">Coding Tracks</Link></li>
                <li><Link to="/assignments" className="text-gray-400 hover:text-white transition-colors">Assignments</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Community</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <address className="not-italic text-gray-400">
                <p>Email: support@campusbridge.edu</p>
                <p>Phone: (123) 456-7890</p>
              </address>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
            <p>&copy; 2025 Campus Bridge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
