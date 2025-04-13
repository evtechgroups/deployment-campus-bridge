
import React, { useState } from 'react';
import MainLayout from '../components/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, UserCheck, UserX, Calendar, Filter, Download } from 'lucide-react';
import AttendanceChart from '../components/AttendanceChart';

// Mock data
const courses = [
  { id: "CS101", name: "Introduction to Computer Science" },
  { id: "CS201", name: "Data Structures and Algorithms" },
  { id: "CS301", name: "Database Systems" },
  { id: "CS401", name: "Web Development" }
];

const students = [
  { id: "1", name: "Sarah Johnson", email: "sarah@example.edu", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150" },
  { id: "2", name: "John Smith", email: "john@example.edu", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150" },
  { id: "3", name: "Michael Chen", email: "michael@example.edu", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150" },
  { id: "4", name: "Emily Rodriguez", email: "emily@example.edu", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150" },
  { id: "5", name: "David Wilson", email: "david@example.edu", avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=150" },
];

const attendanceData = [
  { subject: "CS101", present: 25, absent: 5, total: 30 },
  { subject: "CS201", present: 22, absent: 8, total: 30 },
  { subject: "CS301", present: 28, absent: 2, total: 30 },
  { subject: "CS401", present: 20, absent: 10, total: 30 }
];

const FacultyAttendance = () => {
  const [selectedCourse, setSelectedCourse] = useState<string>("CS101");
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [attendance, setAttendance] = useState<Record<string, 'present' | 'absent' | 'late'>>({
    "1": "present",
    "2": "present",
    "3": "absent",
    "4": "late",
    "5": "present"
  });

  const handleAttendanceChange = (studentId: string, status: 'present' | 'absent' | 'late') => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const presentCount = Object.values(attendance).filter(status => status === 'present').length;
  const absentCount = Object.values(attendance).filter(status => status === 'absent').length;
  const lateCount = Object.values(attendance).filter(status => status === 'late').length;
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Attendance Management</h1>
            <p className="text-muted-foreground">Record and analyze student attendance</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </Button>
            <Button className="bg-campus-600 hover:bg-campus-700 gap-2">
              <Calendar className="h-4 w-4" />
              <span>Schedule</span>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="record" className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-3 md:inline-flex h-auto">
            <TabsTrigger value="record">Record Attendance</TabsTrigger>
            <TabsTrigger value="history">Attendance History</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="record">
            <Card>
              <CardHeader>
                <CardTitle>Mark Attendance</CardTitle>
                <CardDescription>Record student attendance for today's class</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Select Course</label>
                    <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a course" />
                      </SelectTrigger>
                      <SelectContent>
                        {courses.map(course => (
                          <SelectItem key={course.id} value={course.id}>
                            {course.id}: {course.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-1 block">Select Date</label>
                    <Input 
                      type="date" 
                      value={selectedDate} 
                      onChange={(e) => setSelectedDate(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="flex justify-between mb-4">
                  <div className="relative w-full md:w-72">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      type="search" 
                      placeholder="Search students..." 
                      className="pl-8" 
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" className="gap-1">
                      <UserCheck className="h-4 w-4" />
                      <span>Mark All Present</span>
                    </Button>
                  </div>
                </div>
                
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {students.map(student => (
                        <TableRow key={student.id}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <div className="h-8 w-8 rounded-full overflow-hidden">
                                <img 
                                  src={student.avatar} 
                                  alt={student.name} 
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div>
                                <p className="font-medium">{student.name}</p>
                                <p className="text-xs text-muted-foreground">{student.email}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={`
                                ${attendance[student.id] === 'present' ? 'bg-green-500 hover:bg-green-600' : 
                                  attendance[student.id] === 'absent' ? 'bg-red-500 hover:bg-red-600' :
                                  'bg-yellow-500 hover:bg-yellow-600'}
                              `}
                            >
                              {attendance[student.id] === 'present' ? 'Present' : 
                               attendance[student.id] === 'absent' ? 'Absent' : 'Late'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-1">
                              <Button 
                                size="sm" 
                                variant={attendance[student.id] === 'present' ? 'default' : 'outline'} 
                                className={attendance[student.id] === 'present' ? 'bg-green-500 hover:bg-green-600' : ''}
                                onClick={() => handleAttendanceChange(student.id, 'present')}
                              >
                                Present
                              </Button>
                              <Button 
                                size="sm" 
                                variant={attendance[student.id] === 'absent' ? 'default' : 'outline'}
                                className={attendance[student.id] === 'absent' ? 'bg-red-500 hover:bg-red-600' : ''}
                                onClick={() => handleAttendanceChange(student.id, 'absent')}
                              >
                                Absent
                              </Button>
                              <Button 
                                size="sm" 
                                variant={attendance[student.id] === 'late' ? 'default' : 'outline'}
                                className={attendance[student.id] === 'late' ? 'bg-yellow-500 hover:bg-yellow-600' : ''}
                                onClick={() => handleAttendanceChange(student.id, 'late')}
                              >
                                Late
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
                <div className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex gap-4">
                    <div>
                      <span className="text-sm text-muted-foreground">Present:</span>
                      <span className="ml-1 font-medium text-green-600">{presentCount}</span>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Absent:</span>
                      <span className="ml-1 font-medium text-red-600">{absentCount}</span>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Late:</span>
                      <span className="ml-1 font-medium text-yellow-600">{lateCount}</span>
                    </div>
                  </div>
                  
                  <Button className="bg-campus-600 hover:bg-campus-700">Save Attendance</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Attendance History</CardTitle>
                <CardDescription>
                  Review past attendance records
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="w-full sm:w-48">
                    <Select defaultValue="CS101">
                      <SelectTrigger>
                        <SelectValue placeholder="Course" />
                      </SelectTrigger>
                      <SelectContent>
                        {courses.map(course => (
                          <SelectItem key={course.id} value={course.id}>
                            {course.id}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="w-full sm:w-auto">
                    <div className="relative flex items-center">
                      <Calendar className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
                      <Input type="date" className="pl-8" />
                    </div>
                  </div>
                  
                  <Button variant="outline" className="gap-1">
                    <Filter className="h-4 w-4" />
                    <span>Filter</span>
                  </Button>
                </div>

                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Course</TableHead>
                        <TableHead>Present</TableHead>
                        <TableHead>Absent</TableHead>
                        <TableHead>Late</TableHead>
                        <TableHead>Attendance %</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[...Array(5)].map((_, i) => {
                        const date = new Date();
                        date.setDate(date.getDate() - i);
                        const presentCount = 20 + Math.floor(Math.random() * 10);
                        const absentCount = 30 - presentCount;
                        const lateCount = Math.floor(Math.random() * 5);
                        
                        return (
                          <TableRow key={i}>
                            <TableCell>
                              {date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                            </TableCell>
                            <TableCell>CS101</TableCell>
                            <TableCell>{presentCount}</TableCell>
                            <TableCell>{absentCount}</TableCell>
                            <TableCell>{lateCount}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">
                                  {Math.round((presentCount / 30) * 100)}%
                                </span>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="stats">
            <Card>
              <CardHeader>
                <CardTitle>Attendance Statistics</CardTitle>
                <CardDescription>
                  Analytics and trends of student attendance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <AttendanceChart data={attendanceData} />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Overall Attendance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {Math.round(
                          (attendanceData.reduce((acc, curr) => acc + curr.present, 0) / 
                          attendanceData.reduce((acc, curr) => acc + curr.total, 0)) * 100
                        )}%
                      </div>
                      <p className="text-xs text-muted-foreground">Average across all courses</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Perfect Attendance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">3</div>
                      <p className="text-xs text-muted-foreground">Students with 100% attendance</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">At Risk</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-red-500">4</div>
                      <p className="text-xs text-muted-foreground">Students below 75% attendance</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default FacultyAttendance;
