import React, { useState } from 'react';
import MainLayout from '@/components/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SelectValue, SelectTrigger, SelectContent, SelectItem, Select } from "@/components/ui/select";
import { BarChart, Bell, Calendar, Code as CodeIcon, FileText, GraduationCap, PieChart, Users, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from 'recharts';

// Mock data for charts
const facultyData = [
  { name: 'Computer Science', count: 18 },
  { name: 'Data Science', count: 12 },
  { name: 'Software Eng.', count: 15 },
  { name: 'AI/ML', count: 8 },
  { name: 'Cybersecurity', count: 6 },
];

const studentEnrollmentData = [
  { month: 'Jan', students: 120 },
  { month: 'Feb', students: 150 },
  { month: 'Mar', students: 200 },
  { month: 'Apr', students: 180 },
  { month: 'May', students: 250 },
  { month: 'Jun', students: 280 },
];

const courseCompletionData = [
  { name: 'Computer Science', value: 78 },
  { name: 'Data Science', value: 65 },
  { name: 'AI/ML', value: 82 },
  { name: 'Cybersecurity', value: 70 },
  { name: 'Web Development', value: 90 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

// Faculty data
const facultyList = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    department: 'Computer Science',
    students: 124,
    courses: 4,
    rating: 4.8,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200',
  },
  {
    id: 2,
    name: 'Prof. Michael Chen',
    department: 'Data Science',
    students: 95,
    courses: 3,
    rating: 4.5,
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=200',
  },
  {
    id: 3,
    name: 'Dr. Alex Wong',
    department: 'AI/ML',
    students: 78,
    courses: 3,
    rating: 4.7,
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200',
  },
  {
    id: 4,
    name: 'Prof. Emily Rodriguez',
    department: 'Cybersecurity',
    students: 65,
    courses: 2,
    rating: 4.6,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200',
  },
];

// Recent activity data
const recentActivity = [
  {
    id: 1,
    action: 'New Faculty Added',
    details: 'Dr. James Wilson was added to the Software Engineering department',
    time: '2 hours ago',
  },
  {
    id: 2,
    action: 'Course Updated',
    details: 'Advanced Machine Learning curriculum was updated with new modules',
    time: '5 hours ago',
  },
  {
    id: 3,
    action: 'Report Generated',
    details: 'Monthly performance analytics report was generated',
    time: '1 day ago',
  },
  {
    id: 4,
    action: 'Student Batch Approved',
    details: '45 new students were approved for the Fall 2024 semester',
    time: '2 days ago',
  },
];

const AdminDashboard = () => {
  const [period, setPeriod] = useState('6m');

  return (
    <MainLayout>
      <div className="grid gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-500 mt-1">
              Comprehensive overview of platform performance and metrics
            </p>
          </div>
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Select Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1m">Last Month</SelectItem>
                <SelectItem value="3m">Last 3 Months</SelectItem>
                <SelectItem value="6m">Last 6 Months</SelectItem>
                <SelectItem value="1y">Last Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-1">
              <FileText size={16} /> Export Report
            </Button>
          </div>
        </div>

        {/* Stats Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Total Students</p>
                    <h3 className="text-3xl font-bold">3,426</h3>
                    <p className="text-sm text-green-600 mt-1 flex items-center">
                      <span className="text-green-600 mr-1">↑</span> 12% from last period
                    </p>
                  </div>
                  <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Total Faculty</p>
                    <h3 className="text-3xl font-bold">158</h3>
                    <p className="text-sm text-green-600 mt-1 flex items-center">
                      <span className="text-green-600 mr-1">↑</span> 5% from last period
                    </p>
                  </div>
                  <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <GraduationCap className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Active Courses</p>
                    <h3 className="text-3xl font-bold">86</h3>
                    <p className="text-sm text-green-600 mt-1 flex items-center">
                      <span className="text-green-600 mr-1">↑</span> 8% from last period
                    </p>
                  </div>
                  <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Coding Submissions</p>
                    <h3 className="text-3xl font-bold">15,240</h3>
                    <p className="text-sm text-green-600 mt-1 flex items-center">
                      <span className="text-green-600 mr-1">↑</span> 18% from last period
                    </p>
                  </div>
                  <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center">
                    <CodeIcon className="h-6 w-6 text-amber-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Faculty by Department */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-xl">Faculty by Department</CardTitle>
              <CardDescription>Distribution across academic departments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart
                    data={facultyData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="name" width={100} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8884d8" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Student Enrollment Trend */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-xl">Student Enrollment Trend</CardTitle>
              <CardDescription>Monthly student enrollment data for the current year</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={studentEnrollmentData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="students"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Faculty List and Course Completion */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Faculty List */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-xl">Top Faculty Members</CardTitle>
              <CardDescription>Faculty ranked by student ratings and course participation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {facultyList.map((faculty) => (
                  <div
                    key={faculty.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={faculty.avatar} alt={faculty.name} />
                        <AvatarFallback>{faculty.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{faculty.name}</p>
                        <p className="text-sm text-gray-500">{faculty.department}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="text-center">
                        <p className="font-medium">{faculty.students}</p>
                        <p className="text-gray-500">Students</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium">{faculty.courses}</p>
                        <p className="text-gray-500">Courses</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium">{faculty.rating}</p>
                        <p className="text-gray-500">Rating</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View All Faculty</Button>
            </CardFooter>
          </Card>

          {/* Course Completion */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-xl">Course Completion Rates</CardTitle>
              <CardDescription>Average student completion by department</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={courseCompletionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {courseCompletionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity and Upcoming Events */}
        <div className="grid grid-cols-1 md:grid-cols-7 gap-6">
          {/* Recent Activity */}
          <Card className="md:col-span-4">
            <CardHeader>
              <CardTitle className="text-xl">Recent Activity</CardTitle>
              <CardDescription>Latest events and administrative actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex gap-4 items-start">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2"></div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-gray-600">{activity.details}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full">View All Activity</Button>
            </CardFooter>
          </Card>

          {/* Upcoming Events */}
          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Calendar size={20} />
                <span>Upcoming Events</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-500">
                  <p className="font-medium">Faculty Training Workshop</p>
                  <p className="text-sm text-gray-600">Introduction to AI-assisted teaching tools</p>
                  <p className="text-xs text-gray-500 mt-1">Tomorrow, 9:00 AM - 12:00 PM</p>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg border-l-4 border-purple-500">
                  <p className="font-medium">Semester Planning Meeting</p>
                  <p className="text-sm text-gray-600">Discussion of Fall 2024 curriculum changes</p>
                  <p className="text-xs text-gray-500 mt-1">June 15, 2:00 PM - 4:00 PM</p>
                </div>
                <div className="bg-amber-50 p-3 rounded-lg border-l-4 border-amber-500">
                  <p className="font-medium">System Maintenance</p>
                  <p className="text-sm text-gray-600">Platform will be offline for updates</p>
                  <p className="text-xs text-gray-500 mt-1">June 18, 10:00 PM - 2:00 AM</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full flex items-center gap-2">
                <Bell size={16} /> Set Reminders
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminDashboard;
