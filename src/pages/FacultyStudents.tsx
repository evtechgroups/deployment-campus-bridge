
import React from 'react';
import MainLayout from '../components/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, ChevronDown, Mail, FilePlus, UserCog, TrendingUp } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const students = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.edu',
    courses: ['CS101', 'CS205'],
    grade: '92%',
    attendance: '95%',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150',
    lastActive: '2 hours ago'
  },
  {
    id: '2',
    name: 'John Smith',
    email: 'john.smith@example.edu',
    courses: ['CS101', 'CS301'],
    grade: '87%',
    attendance: '82%',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150',
    lastActive: '1 day ago'
  },
  {
    id: '3',
    name: 'Michael Chen',
    email: 'michael.c@example.edu',
    courses: ['CS205'],
    grade: '95%',
    attendance: '98%',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150',
    lastActive: '3 hours ago'
  },
  {
    id: '4',
    name: 'Emily Rodriguez',
    email: 'emily.r@example.edu',
    courses: ['CS101', 'CS301'],
    grade: '78%',
    attendance: '75%',
    status: 'at-risk',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150',
    lastActive: '5 days ago'
  },
  {
    id: '5',
    name: 'David Wilson',
    email: 'david.w@example.edu',
    courses: ['CS301'],
    grade: '83%',
    attendance: '89%',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=150',
    lastActive: '1 day ago'
  },
  {
    id: '6',
    name: 'Lisa Wang',
    email: 'lisa.w@example.edu',
    courses: ['CS101', 'CS205'],
    grade: '91%',
    attendance: '93%',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?auto=format&fit=crop&w=150',
    lastActive: '4 hours ago'
  },
  {
    id: '7',
    name: 'Robert Garcia',
    email: 'robert.g@example.edu',
    courses: ['CS101'],
    grade: '65%',
    attendance: '70%',
    status: 'at-risk',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150',
    lastActive: '1 week ago'
  },
  {
    id: '8',
    name: 'Jennifer Lee',
    email: 'jennifer.l@example.edu',
    courses: ['CS205', 'CS301'],
    grade: '88%',
    attendance: '91%',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150',
    lastActive: '2 days ago'
  }
];

const FacultyStudents = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Student Management</h1>
            <p className="text-muted-foreground">View and manage students across your courses.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Mail className="h-4 w-4" />
              <span>Email All</span>
            </Button>
            <Button className="bg-campus-600 hover:bg-campus-700 gap-2">
              <FilePlus className="h-4 w-4" />
              <span>Export Data</span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{students.length}</div>
              <p className="text-xs text-muted-foreground">across all courses</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Average Grade</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(
                  students.reduce((acc, student) => acc + parseInt(student.grade), 0) / 
                  students.length
                )}%
              </div>
              <p className="text-xs text-muted-foreground">class performance</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Average Attendance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(
                  students.reduce((acc, student) => acc + parseInt(student.attendance), 0) / 
                  students.length
                )}%
              </div>
              <p className="text-xs text-muted-foreground">class participation</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">At-Risk Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{students.filter(student => student.status === 'at-risk').length}</div>
              <p className="text-xs text-muted-foreground">need attention</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <CardTitle>Students</CardTitle>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="search" 
                  placeholder="Search students..." 
                  className="pl-8" 
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Courses</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Attendance</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={student.avatar} />
                          <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-xs text-muted-foreground">{student.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {student.courses.map((course, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {course}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="w-full max-w-24">
                        <div className="flex items-center justify-between mb-1 text-xs">
                          <span>{student.grade}</span>
                        </div>
                        <Progress 
                          value={parseInt(student.grade)} 
                          className={`h-2 ${
                            parseInt(student.grade) < 70 ? 'bg-red-100' : 
                            parseInt(student.grade) < 80 ? 'bg-yellow-100' : 
                            'bg-green-100'
                          }`}
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="w-full max-w-24">
                        <div className="flex items-center justify-between mb-1 text-xs">
                          <span>{student.attendance}</span>
                        </div>
                        <Progress 
                          value={parseInt(student.attendance)} 
                          className={`h-2 ${
                            parseInt(student.attendance) < 75 ? 'bg-red-100' : 
                            parseInt(student.attendance) < 85 ? 'bg-yellow-100' : 
                            'bg-green-100'
                          }`}
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`
                          ${student.status === 'active' ? 'bg-green-500 hover:bg-green-600' : 
                            'bg-red-500 hover:bg-red-600'}
                        `}
                      >
                        {student.status === 'active' ? 'Active' : 'At Risk'}
                      </Badge>
                    </TableCell>
                    <TableCell>{student.lastActive}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="icon">
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <UserCog className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <TrendingUp className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="border-t p-4 flex justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {students.length} students
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm" disabled>Next</Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
};

export default FacultyStudents;
