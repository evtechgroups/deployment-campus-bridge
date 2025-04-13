
import React, { useState } from 'react';
import MainLayout from '../components/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, MapPin, Users, Search, Filter, ArrowRight, Calendar, Award } from 'lucide-react';
import { Club, ClubEvent } from '@/types';
import { toast } from "@/components/ui/use-toast";
import ClubEventCard from '@/components/ClubEventCard';
import ClubCard from '@/components/ClubCard';
import { motion } from 'framer-motion';

// Mock data for clubs
const mockClubs: Club[] = [
  {
    id: '1',
    name: 'Coding Club',
    description: 'A community of passionate programmers who love to code, collaborate, and create.',
    logoUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=150',
    bannerUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200',
    category: 'Technical',
    members: 120,
    foundedAt: new Date('2020-05-15'),
    faculty: 'Dr. Jane Smith',
    socialLinks: {
      instagram: 'https://instagram.com/codingclub',
      twitter: 'https://twitter.com/codingclub',
      linkedin: 'https://linkedin.com/company/codingclub',
      website: 'https://codingclub.edu'
    }
  },
  {
    id: '2',
    name: 'Robotics Society',
    description: 'Building the future through robotics innovation and engineering excellence.',
    logoUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=150',
    bannerUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1200',
    category: 'Technical',
    members: 85,
    foundedAt: new Date('2019-08-10'),
    faculty: 'Prof. Michael Johnson',
    socialLinks: {
      instagram: 'https://instagram.com/roboticssociety',
      website: 'https://robotics.edu'
    }
  },
  {
    id: '3',
    name: 'Photography Club',
    description: 'Capturing moments, creating memories, and exploring visual storytelling.',
    logoUrl: 'https://images.unsplash.com/photo-1493397212122-2b85dda8106b?auto=format&fit=crop&w=150',
    bannerUrl: 'https://images.unsplash.com/photo-1493397212122-2b85dda8106b?auto=format&fit=crop&w=1200',
    category: 'Arts',
    members: 65,
    foundedAt: new Date('2021-01-20'),
    faculty: 'Ms. Sophie Lee',
    socialLinks: {
      instagram: 'https://instagram.com/photoclub',
      website: 'https://photography.edu'
    }
  },
  {
    id: '4',
    name: 'Debate Society',
    description: 'Fostering critical thinking and public speaking skills through competitive debate.',
    logoUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=150',
    bannerUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200',
    category: 'Academic',
    members: 45,
    foundedAt: new Date('2018-11-05'),
    faculty: 'Dr. Robert Williams',
    socialLinks: {
      twitter: 'https://twitter.com/debatesociety',
      website: 'https://debate.edu'
    }
  },
  {
    id: '5',
    name: 'Music Club',
    description: 'Celebrating the universal language of music through performances and collaborations.',
    logoUrl: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=150',
    bannerUrl: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=1200',
    category: 'Arts',
    members: 90,
    foundedAt: new Date('2020-03-15'),
    faculty: 'Prof. Emily Chen',
    socialLinks: {
      instagram: 'https://instagram.com/musicclub',
      website: 'https://music.edu'
    }
  }
];

// Mock data for club events
const mockEvents: ClubEvent[] = [
  {
    id: '1',
    clubId: '1',
    title: 'Hackathon 2025',
    description: 'A 24-hour coding competition to build innovative solutions for real-world problems.',
    startDate: new Date('2025-05-15T09:00:00'),
    endDate: new Date('2025-05-16T09:00:00'),
    location: 'Main Campus, Building C',
    imageUrl: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=1200',
    status: 'upcoming',
    maxParticipants: 100,
    registeredParticipants: 75
  },
  {
    id: '2',
    clubId: '2',
    title: 'Robotics Workshop',
    description: 'Learn the basics of robot design, programming, and problem-solving.',
    startDate: new Date('2025-04-20T10:00:00'),
    endDate: new Date('2025-04-20T16:00:00'),
    location: 'Engineering Building, Lab 302',
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200',
    status: 'upcoming',
    maxParticipants: 30,
    registeredParticipants: 28
  },
  {
    id: '3',
    clubId: '3',
    title: 'Photography Exhibition',
    description: 'Showcasing the best photographs taken by our club members throughout the year.',
    startDate: new Date('2025-04-15T11:00:00'),
    endDate: new Date('2025-04-17T18:00:00'),
    location: 'Arts Center, Gallery Hall',
    imageUrl: 'https://images.unsplash.com/photo-1493397212122-2b85dda8106b?auto=format&fit=crop&w=1200',
    status: 'ongoing',
    maxParticipants: 200,
    registeredParticipants: 120
  },
  {
    id: '4',
    clubId: '4',
    title: 'Inter-University Debate Competition',
    description: 'Annual debate tournament featuring teams from universities across the country.',
    startDate: new Date('2025-06-10T09:00:00'),
    endDate: new Date('2025-06-12T17:00:00'),
    location: 'Conference Center, Auditorium A',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200',
    status: 'upcoming',
    maxParticipants: 50,
    registeredParticipants: 32
  },
  {
    id: '5',
    clubId: '5',
    title: 'Spring Concert',
    description: 'A celebration of music featuring performances by our club members and special guests.',
    startDate: new Date('2025-05-01T18:00:00'),
    endDate: new Date('2025-05-01T21:00:00'),
    location: 'Performing Arts Building, Main Stage',
    imageUrl: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=1200',
    status: 'upcoming',
    maxParticipants: 300,
    registeredParticipants: 210
  }
];

const ClubActivities = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredClubs, setFilteredClubs] = useState(mockClubs);
  const [filteredEvents, setFilteredEvents] = useState(mockEvents);

  const categories = ['All', 'Technical', 'Arts', 'Academic', 'Sports', 'Cultural'];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    const clubResults = mockClubs.filter(club => 
      club.name.toLowerCase().includes(query.toLowerCase()) || 
      club.description.toLowerCase().includes(query.toLowerCase())
    );
    
    const eventResults = mockEvents.filter(event => 
      event.title.toLowerCase().includes(query.toLowerCase()) || 
      event.description.toLowerCase().includes(query.toLowerCase())
    );
    
    setFilteredClubs(clubResults);
    setFilteredEvents(eventResults);
  };

  const handleCategoryFilter = (category: string) => {
    if (category === 'All') {
      setSelectedCategory(null);
      setFilteredClubs(mockClubs);
    } else {
      setSelectedCategory(category);
      const filteredResults = mockClubs.filter(club => 
        club.category === category
      );
      setFilteredClubs(filteredResults);
    }
  };

  const handleRegisterEvent = (eventId: string) => {
    toast({
      title: "Successfully registered!",
      description: "You have been registered for this event. Check your email for confirmation.",
    });
  };

  const handleJoinClub = (clubId: string) => {
    toast({
      title: "Request sent!",
      description: "Your request to join the club has been sent. A club admin will review your request.",
    });
  };

  const handleGenerateCertificate = () => {
    toast({
      title: "Certificate generated!",
      description: "Your certificate has been generated and sent to your email.",
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Club Activities</h1>
            <p className="text-muted-foreground">Explore university clubs, events, and opportunities</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={() => handleGenerateCertificate()}
            >
              <Award size={16} />
              My Certificates
            </Button>
            <Button className="bg-campus-600 hover:bg-campus-700 gap-2">
              <Calendar size={16} />
              My Events
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search clubs and events..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto py-1 w-full md:w-auto">
            {categories.map(category => (
              <Badge 
                key={category}
                variant={category === (selectedCategory || 'All') ? "default" : "outline"}
                className="cursor-pointer px-3 py-1"
                onClick={() => handleCategoryFilter(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        <Tabs defaultValue="clubs" className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-3 md:inline-flex h-auto">
            <TabsTrigger value="clubs">Clubs</TabsTrigger>
            <TabsTrigger value="events">Upcoming Events</TabsTrigger>
            <TabsTrigger value="my-activities">My Activities</TabsTrigger>
          </TabsList>
          
          <TabsContent value="clubs">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredClubs.map(club => (
                <motion.div key={club.id} variants={itemVariants}>
                  <ClubCard club={club} onJoinClub={handleJoinClub} />
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
          
          <TabsContent value="events">
            <motion.div 
              className="space-y-6 mt-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredEvents.map(event => (
                <motion.div key={event.id} variants={itemVariants}>
                  <ClubEventCard 
                    event={event} 
                    club={mockClubs.find(club => club.id === event.clubId)} 
                    onRegister={handleRegisterEvent} 
                  />
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
          
          <TabsContent value="my-activities">
            <div className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>My Club Activities</CardTitle>
                  <CardDescription>
                    Track your participation in clubs and events
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Clubs I've Joined</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card>
                          <CardHeader className="p-4">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-full overflow-hidden">
                                <img 
                                  src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=150" 
                                  alt="Coding Club" 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <h4 className="font-semibold">Coding Club</h4>
                                <p className="text-sm text-muted-foreground">Member since Feb 2025</p>
                              </div>
                            </div>
                          </CardHeader>
                        </Card>
                        <Card>
                          <CardHeader className="p-4">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-full overflow-hidden">
                                <img 
                                  src="https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=150" 
                                  alt="Music Club" 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <h4 className="font-semibold">Music Club</h4>
                                <p className="text-sm text-muted-foreground">Member since Jan 2025</p>
                              </div>
                            </div>
                          </CardHeader>
                        </Card>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">Upcoming Events I'm Attending</h3>
                      <Card>
                        <CardHeader className="p-4">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                              <h4 className="font-semibold">Hackathon 2025</h4>
                              <p className="text-sm text-muted-foreground">Coding Club</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="flex items-center gap-1">
                                <CalendarDays size={12} />
                                May 15-16, 2025
                              </Badge>
                            </div>
                          </div>
                        </CardHeader>
                      </Card>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">My Certificates</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card>
                          <CardHeader className="p-4">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 flex items-center justify-center bg-campus-50 text-campus-700 rounded-full">
                                <Award size={24} />
                              </div>
                              <div>
                                <h4 className="font-semibold">Workshop Participation</h4>
                                <p className="text-sm text-muted-foreground">Coding Club - March 2025</p>
                              </div>
                            </div>
                          </CardHeader>
                          <CardFooter className="p-4 pt-0">
                            <Button variant="outline" className="w-full" onClick={handleGenerateCertificate}>
                              Download Certificate
                            </Button>
                          </CardFooter>
                        </Card>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default ClubActivities;
