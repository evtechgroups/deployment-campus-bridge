
import React from 'react';
import MainLayout from '../components/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, UserPlus, Mail, UserCog, Eye, ShieldAlert, FileText } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

const students = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.edu',
    program: 'Computer Science',
    year: 'Junior',
    gpa: 3.8,
    courses: 5,
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150',
  },
  {
    id: '2',
    name: 'John Smith',
    email: 'john.smith@example.edu',
    program: 'Computer Science',
    year: 'Senior',
    gpa: 3.5,
    courses: 4,
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150',
  },
  {
    id: '3',
    name: 'Michael Chen',
    email: 'michael.c@example.edu',
    program: 'Information Systems',
    year: 'Sophomore',
    gpa: 3.9,
    courses: 5,
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150',
  },
  {
    id: '4',
    name: 'Emily Rodriguez',
    email: 'emily.r@example.edu',
    program: 'Data Science',
    year: 'Junior',
    gpa: 3.2,
    courses: 5,
    status: 'probation',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150',
  },
  {
    id: '5',
    name: 'David Wilson',
    email: 'david.w@example.edu',
    program: 'Computer Science',
    year: 'Freshman',
    gpa: 3.6,
    courses: 6,
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=150',
  },
  {
    id: '6',
    name: 'Lisa Wang',
    email: 'lisa.w@example.edu',
    program: 'Software Engineering',
    year: 'Senior',
    gpa: 3.7,
    courses: 4,
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?auto=format&fit=crop&w=150',
  },
  {
    id: '7',
    name: 'Robert Garcia',
    email: 'robert.g@example.edu',
    program: 'Computer Science',
    year: 'Sophomore',
    gpa: 2.8,
    courses: 5,
    status: 'probation',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150',
  },
  {
    id: '8',
    name: 'Jennifer Lee',
    email: 'jennifer.l@example.edu',
    program: 'Information Systems',
    year: 'Junior',
    gpa: 3.5,
    courses: 5,
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150',
  }
];

const formatGPA = (gpa: number) => gpa.toFixed(1);

const AdminStudents = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Student Management</h1>
            <p className="text-muted-foreground">Oversee student enrollment, academic status, and progress.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <FileText className="h-4 w-4" />
              <span>Export Data</span>
            </Button>
            <Button className="bg-campus-600 hover:bg-campus-700 gap-2">
              <UserPlus className="h-4 w-4" />
              <span>Add Student</span>
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
              <p className="text-xs text-muted-foreground">currently enrolled</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Average GPA</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatGPA(students.reduce((acc, curr) => acc + curr.gpa, 0) / students.length)}
              </div>
              <p className="text-xs text-muted-foreground">across all students</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Programs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{new Set(students.map(s => s.program)).size}</div>
              <p className="text-xs text-muted-foreground">study areas</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Academic Issues</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{students.filter(s => s.status === 'probation').length}</div>
              <p className="text-xs text-muted-foreground">students on probation</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <CardTitle>Student Directory</CardTitle>
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
                  <TableHead>Name</TableHead>
                  <TableHead>Program</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>GPA</TableHead>
                  <TableHead>Courses</TableHead>
                  <TableHead>Status</TableHead>
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
                    <TableCell>{student.program}</TableCell>
                    <TableCell>{student.year}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className={`font-medium ${student.gpa < 3.0 ? 'text-red-600' : student.gpa >= 3.7 ? 'text-green-600' : ''}`}>
                          {formatGPA(student.gpa)}
                        </span>
                        <Progress 
                          value={(student.gpa / 4) * 100} 
                          className={`h-2 w-12 ${
                            student.gpa < 3.0 ? 'bg-red-100' : 
                            student.gpa >= 3.7 ? 'bg-green-100' : 
                            'bg-gray-100'
                          }`}
                        />
                      </div>
                    </TableCell>
                    <TableCell>{student.courses}</TableCell>
                    <TableCell>
                      <Badge
                        className={`
                          ${student.status === 'active' ? 'bg-green-500 hover:bg-green-600' : 
                            'bg-red-500 hover:bg-red-600'}
                        `}
                      >
                        {student.status === 'active' ? 'Active' : 'Probation'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <UserCog className="h-4 w-4" />
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

export default AdminStudents;
