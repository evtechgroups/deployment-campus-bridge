
import React from 'react';
import MainLayout from '../components/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, FileText, Users, Calendar, Settings } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Link } from 'react-router-dom';

const facultyCourses = [
  {
    id: '1',
    code: 'CS101',
    name: 'Introduction to Programming',
    semester: 'Spring 2025',
    students: 120,
    completion: 68,
    lastUpdated: '2 days ago',
    status: 'active',
  },
  {
    id: '2',
    code: 'CS205',
    name: 'Data Structures',
    semester: 'Spring 2025',
    students: 85,
    completion: 42,
    lastUpdated: '1 day ago',
    status: 'active',
  },
  {
    id: '3',
    code: 'CS301',
    name: 'Algorithms',
    semester: 'Spring 2025',
    students: 65,
    completion: 25,
    lastUpdated: 'Today',
    status: 'active',
  },
  {
    id: '4',
    code: 'CS401',
    name: 'Database Systems',
    semester: 'Fall 2024',
    students: 78,
    completion: 100,
    lastUpdated: '2 months ago',
    status: 'completed',
  },
  {
    id: '5',
    code: 'CS350',
    name: 'Web Development',
    semester: 'Fall 2024',
    students: 92,
    completion: 100,
    lastUpdated: '3 months ago',
    status: 'completed',
  },
  {
    id: '6',
    code: 'CS450',
    name: 'Machine Learning',
    semester: 'Summer 2025',
    students: 0,
    completion: 0,
    lastUpdated: 'Not started',
    status: 'upcoming',
  }
];

const courseStats = {
  active: facultyCourses.filter(course => course.status === 'active').length,
  total: facultyCourses.length,
  students: facultyCourses.reduce((acc, course) => acc + course.students, 0),
  avgCompletion: Math.round(facultyCourses.filter(course => course.status === 'active').reduce((acc, course) => acc + course.completion, 0) / facultyCourses.filter(course => course.status === 'active').length)
};

const FacultyCourses = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Manage Courses</h1>
            <p className="text-muted-foreground">View and manage your teaching courses.</p>
          </div>
          <div className="flex gap-2">
            <Link to={"./faculty/content"}>
            <Button className="bg-campus-600 hover:bg-campus-700 gap-2">
              <Plus className="h-4 w-4" />
              <span>New Course</span>
            </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{courseStats.active}</div>
              <p className="text-xs text-muted-foreground">out of {courseStats.total} total courses</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{courseStats.students}</div>
              <p className="text-xs text-muted-foreground">across all courses</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Avg. Completion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{courseStats.avgCompletion}%</div>
              <p className="text-xs text-muted-foreground">for active courses</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Materials</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45</div>
              <p className="text-xs text-muted-foreground">learning resources</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <CardTitle>Course Management</CardTitle>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="search" 
                  placeholder="Search courses..." 
                  className="pl-8" 
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course</TableHead>
                  <TableHead>Semester</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Completion</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {facultyCourses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{course.name}</p>
                        <p className="text-xs text-muted-foreground">{course.code}</p>
                      </div>
                    </TableCell>
                    <TableCell>{course.semester}</TableCell>
                    <TableCell>{course.students}</TableCell>
                    <TableCell>
                      <div className="w-full max-w-24">
                        <div className="flex items-center justify-between mb-1 text-xs">
                          <span>{course.completion}%</span>
                        </div>
                        <Progress value={course.completion} className="h-2" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`
                          ${course.status === 'active' ? 'bg-green-500 hover:bg-green-600' : 
                            course.status === 'completed' ? 'bg-blue-500 hover:bg-blue-600' : 
                            'bg-yellow-500 hover:bg-yellow-600'}
                        `}
                      >
                        {course.status === 'active' ? 'Active' : 
                          course.status === 'completed' ? 'Completed' : 
                          'Upcoming'}
                      </Badge>
                    </TableCell>
                    <TableCell>{course.lastUpdated}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="icon" disabled={course.status === 'upcoming'}>
                          <FileText className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" disabled={course.status === 'upcoming'}>
                          <Users className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" disabled={course.status === 'upcoming'}>
                          <Calendar className="h-4 w-4" />
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
              Showing {facultyCourses.length} of {facultyCourses.length} courses
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

export default FacultyCourses;
