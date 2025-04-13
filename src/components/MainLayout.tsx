
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Book, BookOpen, Compass, LucideIcon, Siren, User, Users, LayoutDashboard, 
  ChevronRight, Menu, X, Calculator, Award, Calendar, CheckCircle2, LogOut, 
  Settings, Bell, Code, Activity, BookMarked, FileText, MessageSquare, Video,
  Club, Briefcase, BookMinus, BookCopy, GraduationCap
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from 'framer-motion';
import AIAssistant from './AIAssistant';
import { toast } from "@/components/ui/use-toast";

type SidebarItem = {
  name: string;
  icon: LucideIcon;
  path: string;
  activePattern?: RegExp;
};

const studentMenuItems: SidebarItem[] = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard', activePattern: /^\/dashboard$/ },
  { name: 'Academic Courses', icon: Book, path: '/academic', activePattern: /^\/academic/ },
  { name: 'Coding Tracks', icon: Compass, path: '/coding', activePattern: /^\/coding/ },
  { name: 'Assignments', icon: CheckCircle2, path: '/assignments', activePattern: /^\/assignments/ },
  { name: 'Assessments', icon: Calculator, path: '/assessments', activePattern: /^\/assessments/ },
  { name: 'Attendance', icon: BookMarked, path: '/attendance', activePattern: /^\/attendance/ },
  { name: 'AI IDE', icon: Code, path: '/ai-ide', activePattern: /^\/ai-ide/ },
  { name: 'Club Activities', icon: Club, path: '/clubs', activePattern: /^\/clubs/ },
  { name: 'Study Rooms', icon: Video, path: '/studyrooms', activePattern: /^\/studyrooms/ },
  { name: 'Doubt Discussion', icon: MessageSquare, path: '/discussions', activePattern: /^\/discussions/ },
  { name: 'Circulars & Notices', icon: FileText, path: '/circulars', activePattern: /^\/circulars/ },
  { name: 'Progress', icon: Award, path: '/progress', activePattern: /^\/progress/ },
  { name: 'Calendar', icon: Calendar, path: '/calendar', activePattern: /^\/calendar/ },
];

const facultyMenuItems: SidebarItem[] = [
  { name: 'Faculty Dashboard', icon: LayoutDashboard, path: '/faculty', activePattern: /^\/faculty$/ },
  { name: 'Manage Courses', icon: BookOpen, path: '/faculty/courses', activePattern: /^\/faculty\/courses/ },
  { name: 'Students', icon: Users, path: '/faculty/students', activePattern: /^\/faculty\/students/ },
  { name: 'Attendance', icon: BookMarked, path: '/faculty/attendance', activePattern: /^\/faculty\/attendance/ },
  { name: 'Create Content', icon: BookCopy, path: '/faculty/content', activePattern: /^\/faculty\/content/ },
  { name: 'Club Management', icon: Club, path: '/faculty/clubs', activePattern: /^\/faculty\/clubs/ },
  { name: 'Study Rooms', icon: Video, path: '/faculty/studyrooms', activePattern: /^\/faculty\/studyrooms/ },
  { name: 'Answer Queries', icon: MessageSquare, path: '/faculty/discussions', activePattern: /^\/faculty\/discussions/ },
  { name: 'Circulars & Notices', icon: FileText, path: '/faculty/circulars', activePattern: /^\/faculty\/circulars/ },
];

const adminMenuItems: SidebarItem[] = [
  { name: 'Admin Dashboard', icon: LayoutDashboard, path: '/admin', activePattern: /^\/admin$/ },
  { name: 'Faculty Management', icon: User, path: '/admin/faculty', activePattern: /^\/admin\/faculty/ },
  { name: 'Student Management', icon: Users, path: '/admin/students', activePattern: /^\/admin\/students/ },
  { name: 'Club Management', icon: Club, path: '/admin/clubs', activePattern: /^\/admin\/clubs/ },
  { name: 'Circulars & Notices', icon: FileText, path: '/admin/circulars', activePattern: /^\/admin\/circulars/ },
  { name: 'Reports', icon: Siren, path: '/admin/reports', activePattern: /^\/admin\/reports/ },
];

const menuGroups = [
  { id: 'student', name: 'Student Portal', items: studentMenuItems },
  { id: 'faculty', name: 'Faculty Portal', items: facultyMenuItems },
  { id: 'admin', name: 'Admin Portal', items: adminMenuItems },
];

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeGroup, setActiveGroup] = useState('student');
  const [notifications, setNotifications] = useState(3);
  const [userName, setUserName] = useState('John Doe');
  const [userProgram, setUserProgram] = useState('Computer Science');
  const [userAvatar, setUserAvatar] = useState('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150');

  // Auto-detect which portal we're in based on the URL
  useEffect(() => {
    if (location.pathname.startsWith('/faculty')) {
      setActiveGroup('faculty');
    } else if (location.pathname.startsWith('/admin')) {
      setActiveGroup('admin');
    } else {
      setActiveGroup('student');
    }
    
    // Check for user data in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUserName(userData.name || 'John Doe');
        setUserProgram(userData.program || 'Computer Science');
        // We could set avatar here too if it's stored
      } catch (e) {
        console.error('Error parsing user data from localStorage', e);
      }
    }
  }, [location.pathname]);

  const handleGroupChange = (groupId: string) => {
    setActiveGroup(groupId);
    
    // Navigate to the appropriate dashboard
    if (groupId === 'student') {
      navigate('/dashboard');
    } else if (groupId === 'faculty') {
      navigate('/faculty');
    } else if (groupId === 'admin') {
      navigate('/admin');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userType');
    localStorage.removeItem('user');
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
    navigate('/login');
  };

  const handleOpenNotifications = () => {
    navigate('/circulars');
  };

  const handleOpenSettings = () => {
    toast({
      title: "Coming soon",
      description: "The settings page is under development",
    });
  };

  const currentMenuItems = menuGroups.find(group => group.id === activeGroup)?.items || [];

  const isActive = (item: SidebarItem) => {
    return item.activePattern 
      ? item.activePattern.test(location.pathname) 
      : location.pathname === item.path;
  };

  const handleMainButtonClick = () => {
    if (activeGroup === 'student') {
      navigate('/academic');
    } else if (activeGroup === 'faculty') {
      navigate('/faculty/courses');
    } else {
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Mobile sidebar backdrop */}
      {!sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/30 z-20 lg:hidden" 
          onClick={() => setSidebarOpen(true)}
        />
      )}

      {/* Sidebar */}
      <motion.aside 
        initial={{ x: -265 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "fixed inset-y-0 left-0 z-30 w-64 border-r bg-sidebar-background transition-transform duration-300 lg:translate-x-0 lg:static lg:z-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="flex items-center justify-between h-16 px-4 border-b">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-campus-600 text-white p-1 rounded">
                <BookOpen size={20} />
              </div>
              <span className="font-semibold text-lg">Campus Bridge</span>
            </Link>
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden" 
              onClick={() => setSidebarOpen(false)}
            >
              <X size={20} />
            </Button>
          </div>

          {/* Portal selector */}
          <div className="px-4 py-3 border-b">
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
              {menuGroups.map(group => (
                <button
                  key={group.id}
                  onClick={() => handleGroupChange(group.id)}
                  className={cn(
                    "flex-1 py-1 px-2 text-xs font-medium rounded-md transition-colors",
                    activeGroup === group.id 
                      ? "bg-white shadow text-campus-800" 
                      : "text-gray-600 hover:text-gray-900"
                  )}
                >
                  {group.name}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation items */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-2">
              {currentMenuItems.map((item) => (
                <motion.li 
                  key={item.path}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                      isActive(item)
                        ? "bg-campus-50 text-campus-700 font-medium"
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    <item.icon size={18} />
                    <span>{item.name}</span>
                    {isActive(item) && <ChevronRight size={16} className="ml-auto" />}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>

          {/* User profile */}
          <div className="border-t p-4">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={userAvatar} />
                <AvatarFallback>{userName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{userName}</p>
                <p className="text-xs text-gray-500 truncate">{userProgram}</p>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-gray-500 hover:text-gray-700"
                onClick={handleLogout}
              >
                <LogOut size={16} />
              </Button>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {/* Top navigation */}
        <header className="h-16 border-b flex items-center justify-between px-4 bg-white">
          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden" 
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={20} />
          </Button>
          
          <div className="flex items-center gap-4 ml-auto">
            <Button 
              variant="outline" 
              size="icon" 
              className="text-gray-600"
              onClick={handleOpenSettings}
            >
              <Settings size={20} />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="relative text-gray-600"
              onClick={handleOpenNotifications}
            >
              <Bell size={20} />
              {notifications > 0 && (
                <span className="absolute top-0 right-0 h-5 w-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center transform translate-x-1/2 -translate-y-1/2">
                  {notifications}
                </span>
              )}
            </Button>
            <Button 
              size="sm" 
              className="bg-campus-600 hover:bg-campus-700"
              onClick={handleMainButtonClick}
            >
              {activeGroup === 'student' ? 'My Courses' :
               activeGroup === 'faculty' ? 'My Classes' :
               'Overview'}
            </Button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 bg-gray-50">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="container mx-auto"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
        
        {/* AI Assistant */}
        <AIAssistant />
      </div>
    </div>
  );
};

export default MainLayout;
