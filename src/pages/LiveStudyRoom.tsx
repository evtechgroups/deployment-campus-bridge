import React, { useState } from "react";
import MainLayout from "../components/MainLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Video,
  Users,
  Clock,
  CalendarDays,
  MessageSquare,
  Mic,
  MicOff,
  Video as VideoIcon,
  VideoOff,
  PhoneOff,
  Share2,
  Search,
  Plus,
  BookOpen,
} from "lucide-react";
import { StudyRoom, User } from "@/types";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Mock data for study rooms
const mockStudyRooms: StudyRoom[] = [
  {
    id: "1",
    name: "Data Structures Study Group",
    description:
      "Join us to review AVL trees, heaps, and graph algorithms before the midterm.",
    subject: "Data Structures",
    host: {
      id: "101",
      name: "Jane Smith",
      email: "jane.smith@university.edu",
      role: "student",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150",
      program: "Computer Science",
    },
    participants: [],
    maxParticipants: 10,
    startTime: new Date("2025-04-15T14:00:00"),
    endTime: new Date("2025-04-15T16:00:00"),
    status: "scheduled",
    roomUrl: "#",
  },
  {
    id: "2",
    name: "Algorithm Design Workshop",
    description:
      "Practice solving complex algorithm problems with optimal solutions.",
    subject: "Algorithms",
    host: {
      id: "102",
      name: "John Doe",
      email: "john.doe@university.edu",
      role: "faculty",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150",
      department: "Computer Science",
    },
    participants: [],
    maxParticipants: 15,
    startTime: new Date("2025-04-16T10:00:00"),
    endTime: new Date("2025-04-16T12:00:00"),
    status: "scheduled",
    roomUrl: "#",
  },
  {
    id: "3",
    name: "Web Development Live Coding",
    description:
      "Building a full-stack web application from scratch using modern frameworks.",
    subject: "Web Development",
    host: {
      id: "103",
      name: "Sarah Johnson",
      email: "sarah.johnson@university.edu",
      role: "faculty",
      avatar:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150",
      department: "Computer Science",
    },
    participants: [],
    maxParticipants: 20,
    startTime: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    endTime: new Date(Date.now() + 1000 * 60 * 90), // 90 minutes from now
    status: "live",
    roomUrl: "#",
  },
];

const mockParticipants: User[] = [
  {
    id: "103",
    name: "Sarah Johnson",
    email: "sarah.johnson@university.edu",
    role: "faculty",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150",
    department: "Computer Science",
  },
  {
    id: "104",
    name: "Alex Chen",
    email: "alex.chen@university.edu",
    role: "student",
    avatar:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=150",
    program: "Computer Science",
  },
  {
    id: "105",
    name: "Maria Garcia",
    email: "maria.garcia@university.edu",
    role: "student",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150",
    program: "Software Engineering",
  },
  {
    id: "106",
    name: "Tom Wilson",
    email: "tom.wilson@university.edu",
    role: "student",
    avatar:
      "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=150",
    program: "Computer Science",
  },
];

const LiveStudyRoom = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeRoom, setActiveRoom] = useState<StudyRoom | null>(null);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [messages, setMessages] = useState<
    { id: string; sender: string; text: string; timestamp: Date }[]
  >([
    {
      id: "1",
      sender: "Sarah Johnson",
      text: "Welcome everyone to our Web Development live coding session!",
      timestamp: new Date(Date.now() - 1000 * 60 * 25),
    },
    {
      id: "2",
      sender: "Alex Chen",
      text: "Thanks for hosting this! I had a question about React hooks.",
      timestamp: new Date(Date.now() - 1000 * 60 * 20),
    },
    {
      id: "3",
      sender: "Maria Garcia",
      text: "Could you explain the difference between useState and useEffect?",
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const filteredRooms = mockStudyRooms.filter(
    (room) =>
      room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleJoinRoom = (room: StudyRoom) => {
    setActiveRoom(room);
    toast({
      title: "Joined study room",
      description: `You've joined ${room.name}`,
    });
  };

  const handleHostRoom = () => {
    toast({
      title: "Create a new study room",
      description: "You can now host your own study session.",
    });
  };

  const handleLeaveRoom = () => {
    setActiveRoom(null);
    toast({
      title: "Left study room",
      description: "You've left the study room.",
    });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now().toString(),
      sender: "You",
      text: newMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, message]);
    setNewMessage("");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  if (activeRoom) {
    return (
      <MainLayout>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                {activeRoom.name}
              </h1>
              <p className="text-muted-foreground">{activeRoom.subject}</p>
            </div>
            <Button variant="destructive" onClick={handleLeaveRoom}>
              <PhoneOff className="mr-2 h-4 w-4" />
              Leave Room
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-250px)]">
            {/* Main video area */}
            <div className="lg:col-span-2 h-full flex flex-col">
              <div className="relative bg-gray-900 rounded-lg overflow-hidden flex-grow">
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200"
                    alt="Study session"
                    className="w-full h-full object-cover opacity-50"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    {!isVideoEnabled ? (
                      <>
                        <VideoOff size={50} className="mb-2" />
                        <p>Your video is off</p>
                      </>
                    ) : null}
                  </div>
                </div>

                {/* Participants grid */}
                <div className="absolute bottom-4 right-4 left-4 flex flex-wrap justify-center gap-2">
                  {mockParticipants.map((participant) => (
                    <div
                      key={participant.id}
                      className="relative w-24 h-24 bg-gray-800 rounded-lg overflow-hidden border-2 border-white"
                    >
                      <img
                        src={participant.avatar}
                        alt={participant.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 truncate">
                        {participant.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Controls */}
              <div className="bg-gray-100 rounded-lg mt-4 p-4 flex justify-center gap-4">
                <Button
                  variant={isAudioEnabled ? "default" : "secondary"}
                  size="icon"
                  className={isAudioEnabled ? "bg-campus-600" : ""}
                  onClick={() => setIsAudioEnabled(!isAudioEnabled)}
                >
                  {isAudioEnabled ? <Mic size={20} /> : <MicOff size={20} />}
                </Button>
                <Button
                  variant={isVideoEnabled ? "default" : "secondary"}
                  size="icon"
                  className={isVideoEnabled ? "bg-campus-600" : ""}
                  onClick={() => setIsVideoEnabled(!isVideoEnabled)}
                >
                  {isVideoEnabled ? (
                    <VideoIcon size={20} />
                  ) : (
                    <VideoOff size={20} />
                  )}
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 size={20} />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={handleLeaveRoom}
                >
                  <PhoneOff size={20} />
                </Button>
              </div>
            </div>

            {/* Chat and participants */}
            <div className="h-full">
              <Tabs defaultValue="chat" className="h-full flex flex-col">
                <TabsList>
                  <TabsTrigger value="chat" className="flex-1">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Chat
                  </TabsTrigger>
                  <TabsTrigger value="participants" className="flex-1">
                    <Users className="h-4 w-4 mr-2" />
                    Participants
                  </TabsTrigger>
                </TabsList>
                <TabsContent
                  value="chat"
                  className="flex-grow flex flex-col overflow-hidden data-[state=active]:flex-grow"
                >
                  <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-white rounded-lg border mb-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === "You"
                            ? "justify-end"
                            : "justify-start"
                          }`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${message.sender === "You"
                              ? "bg-campus-100 text-campus-800"
                              : "bg-gray-100"
                            }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">
                              {message.sender}
                            </span>
                            <span className="text-xs text-gray-500">
                              {message.timestamp.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                          <p className="text-sm">{message.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <Input
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <Button type="submit">Send</Button>
                  </form>
                </TabsContent>
                <TabsContent
                  value="participants"
                  className="data-[state=active]:flex-grow overflow-y-auto"
                >
                  <div className="bg-white rounded-lg border p-4 space-y-4">
                    <div>
                      <h3 className="font-medium">Host</h3>
                      <div className="flex items-center gap-3 mt-2 p-2 rounded-lg hover:bg-gray-50">
                        <img
                          src={activeRoom.host.avatar}
                          alt={activeRoom.host.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <p className="font-medium">{activeRoom.host.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {activeRoom.host.role === "faculty"
                              ? "Faculty"
                              : "Student"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium">
                        Participants ({mockParticipants.length})
                      </h3>
                      <div className="space-y-1 mt-2">
                        {mockParticipants.map((participant) => (
                          <div
                            key={participant.id}
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50"
                          >
                            <img
                              src={participant.avatar}
                              alt={participant.name}
                              className="w-10 h-10 rounded-full"
                            />
                            <div>
                              <p className="font-medium">{participant.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {participant.role === "faculty"
                                  ? "Faculty"
                                  : "Student"}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Live Study Rooms
            </h1>
            <p className="text-muted-foreground">
              Join virtual study sessions or create your own
            </p>
          </div>
          <Button
            className="bg-campus-600 hover:bg-campus-700 gap-2"
            onClick={handleHostRoom}
          >
            <Plus size={16} />
            Host a Study Room
          </Button>
        </div>

        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search study rooms..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Tabs defaultValue="live">
          <TabsList>
            <TabsTrigger value="live" className="flex gap-2 items-center">
              <Badge className="bg-green-500 h-2 w-2 p-0 rounded-full" />
              Live Now
            </TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="myrooms">My Rooms</TabsTrigger>
          </TabsList>

          <TabsContent value="live">
            <motion.div
              className="space-y-4 mt-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredRooms
                .filter((room) => room.status === "live")
                .map((room) => (
                  <motion.div key={room.id} variants={itemVariants}>
                    <Card>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2">
                              <CardTitle>{room.name}</CardTitle>
                              <Badge className="bg-green-500">Live</Badge>
                            </div>
                            <CardDescription>{room.subject}</CardDescription>
                          </div>

                          <Link to={"https://evtechtcmeet.vercel.app/meeting/user_2eOZQ4WeZ71dMaVzVi9RH2zBjiI?personal=true"} target="_blank">
                            <Button>Join</Button>
                          </Link>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600">
                          {room.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-4">
                          <Badge
                            variant="outline"
                            className="flex items-center gap-1"
                          >
                            <Users size={12} />
                            {Math.floor(Math.random() * 10)}/
                            {room.maxParticipants}
                          </Badge>
                          <Badge
                            variant="outline"
                            className="flex items-center gap-1"
                          >
                            <Clock size={12} />
                            Started{" "}
                            {Math.floor(
                              (Date.now() - room.startTime.getTime()) /
                              (1000 * 60)
                            )}{" "}
                            mins ago
                          </Badge>
                        </div>
                      </CardContent>
                      <CardFooter className="border-t pt-4">
                        <div className="flex items-center gap-2">
                          <img
                            src={room.host.avatar}
                            alt={room.host.name}
                            className="w-8 h-8 rounded-full"
                          />
                          <div>
                            <p className="text-sm font-medium">
                              {room.host.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Host
                            </p>
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}

              {filteredRooms.filter((room) => room.status === "live").length ===
                0 && (
                  <div className="text-center py-12">
                    <Video className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium">
                      No live study rooms yet
                    </h3>
                    <p className="text-muted-foreground">
                      Create a room or check back later!
                    </p>
                  </div>
                )}
            </motion.div>
          </TabsContent>

          <TabsContent value="upcoming">
            <motion.div
              className="space-y-4 mt-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredRooms
                .filter((room) => room.status === "scheduled")
                .map((room) => (
                  <motion.div key={room.id} variants={itemVariants}>
                    <Card>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{room.name}</CardTitle>
                            <CardDescription>{room.subject}</CardDescription>
                          </div>
                          <Button variant="outline">
                            <CalendarDays className="mr-2 h-4 w-4" />
                            Remind Me
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600">
                          {room.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-4">
                          <Badge
                            variant="outline"
                            className="flex items-center gap-1"
                          >
                            <CalendarDays size={12} />
                            {room.startTime.toLocaleDateString()} at{" "}
                            {room.startTime.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </Badge>
                          <Badge
                            variant="outline"
                            className="flex items-center gap-1"
                          >
                            <Clock size={12} />
                            {Math.floor(
                              (room.endTime.getTime() -
                                room.startTime.getTime()) /
                              (1000 * 60 * 60)
                            )}{" "}
                            hours
                          </Badge>
                          <Badge
                            variant="outline"
                            className="flex items-center gap-1"
                          >
                            <Users size={12} />
                            {Math.floor(Math.random() * 5)}/
                            {room.maxParticipants}
                          </Badge>
                        </div>
                      </CardContent>
                      <CardFooter className="border-t pt-4">
                        <div className="flex items-center gap-2">
                          <img
                            src={room.host.avatar}
                            alt={room.host.name}
                            className="w-8 h-8 rounded-full"
                          />
                          <div>
                            <p className="text-sm font-medium">
                              {room.host.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Host
                            </p>
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="myrooms">
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium">
                You haven't joined any rooms yet
              </h3>
              <p className="text-muted-foreground">
                Join a live room or schedule your own study session
              </p>
              <Button
                className="mt-4 bg-campus-600 hover:bg-campus-700"
                onClick={handleHostRoom}
              >
                <Plus className="mr-2 h-4 w-4" />
                Host a Study Room
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default LiveStudyRoom;
