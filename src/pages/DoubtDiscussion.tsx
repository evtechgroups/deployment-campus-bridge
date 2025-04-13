
import React, { useState } from 'react';
import MainLayout from '../components/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MessageSquare, ThumbsUp, Send, Code, FileText, Search, Filter, Calendar, User, Clock, BookOpen } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";
import { motion } from 'framer-motion';

interface Discussion {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  createdAt: Date;
  tags: string[];
  likes: number;
  replies: Reply[];
  solved: boolean;
}

interface Reply {
  id: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  createdAt: Date;
  isAnswer: boolean;
  likes: number;
}

// Mock data for discussions
const mockDiscussions: Discussion[] = [
  {
    id: '1',
    title: 'How to implement a binary search tree in Java?',
    content: "I'm trying to implement a binary search tree in Java, but I'm having trouble with the delete operation. Can someone explain how to properly handle node deletion when the node has two children?",
    author: {
      name: 'Alex Chen',
      avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=150',
      role: 'student'
    },
    createdAt: new Date('2025-04-10T14:30:00'),
    tags: ['Java', 'Data Structures', 'Binary Trees'],
    likes: 8,
    replies: [
      {
        id: '1-1',
        content: "When deleting a node with two children, you need to find the in-order successor (the smallest value in the right subtree) or the in-order predecessor (the largest value in the left subtree) to replace the node you're deleting. Here's some code that demonstrates this approach:\n```java\nprivate Node deleteNode(Node root, int key) {\n    if (root == null) return null;\n    \n    if (key < root.value) {\n        root.left = deleteNode(root.left, key);\n    } else if (key > root.value) {\n        root.right = deleteNode(root.right, key);\n    } else {\n        // Node with only one child or no child\n        if (root.left == null) return root.right;\n        if (root.right == null) return root.left;\n        \n        // Node with two children\n        // Get the inorder successor (smallest in the right subtree)\n        root.value = minValue(root.right);\n        \n        // Delete the inorder successor\n        root.right = deleteNode(root.right, root.value);\n    }\n    \n    return root;\n}\n\nprivate int minValue(Node root) {\n    int minValue = root.value;\n    while (root.left != null) {\n        minValue = root.left.value;\n        root = root.left;\n    }\n    return minValue;\n}\n```",
        author: {
          name: 'Dr. Sarah Johnson',
          avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150',
          role: 'faculty'
        },
        createdAt: new Date('2025-04-10T15:45:00'),
        isAnswer: true,
        likes: 15
      },
      {
        id: '1-2',
        content: "Thank you Dr. Johnson! That was really helpful. I implemented your solution and it works perfectly.",
        author: {
          name: 'Alex Chen',
          avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=150',
          role: 'student'
        },
        createdAt: new Date('2025-04-10T16:30:00'),
        isAnswer: false,
        likes: 2
      }
    ],
    solved: true
  },
  {
    id: '2',
    title: 'Understanding React Hooks: useEffect dependency array',
    content: "I'm new to React and I'm trying to understand the dependency array in useEffect. When should I include variables in the dependency array and what happens if I leave it empty? Also, what's the difference between not providing a dependency array at all versus providing an empty one?",
    author: {
      name: 'Maria Garcia',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150',
      role: 'student'
    },
    createdAt: new Date('2025-04-12T09:15:00'),
    tags: ['React', 'JavaScript', 'Hooks'],
    likes: 12,
    replies: [
      {
        id: '2-1',
        content: "Great question! The dependency array in useEffect determines when the effect should run:\n\n1. No dependency array: The effect runs after every render\n2. Empty dependency array `[]`: The effect runs only after the initial render (similar to componentDidMount)\n3. With dependencies `[a, b]`: The effect runs after the initial render and whenever any of the dependencies (a or b) change.\n\nYou should include any variables from the component scope (like props, state, or values derived from them) that your effect uses. If you don't, you might experience bugs due to stale closures.\n\nHere's an example:\n```jsx\n// Runs after every render\nuseEffect(() => {\n  console.log('Component rendered');\n});\n\n// Runs only after the initial render\nuseEffect(() => {\n  console.log('Component mounted');\n}, []);\n\n// Runs after initial render and when count changes\nuseEffect(() => {\n  console.log('Count changed:', count);\n}, [count]);\n```",
        author: {
          name: 'Tom Wilson',
          avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=150',
          role: 'student'
        },
        createdAt: new Date('2025-04-12T10:20:00'),
        isAnswer: true,
        likes: 18
      }
    ],
    solved: true
  },
  {
    id: '3',
    title: 'Optimizing SQL queries for large datasets',
    content: "I'm working with a database that has grown significantly over time, and I'm noticing that some of my queries are taking too long to execute. The main table has over 5 million records, and I need to join it with several other tables. Are there any general best practices for optimizing SQL queries for large datasets?",
    author: {
      name: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150',
      role: 'student'
    },
    createdAt: new Date('2025-04-11T13:45:00'),
    tags: ['SQL', 'Database', 'Performance'],
    likes: 10,
    replies: [],
    solved: false
  }
];

const DoubtDiscussion = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedDiscussion, setSelectedDiscussion] = useState<Discussion | null>(null);
  const [newReply, setNewReply] = useState('');
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostTags, setNewPostTags] = useState('');
  
  const allTags = Array.from(new Set(mockDiscussions.flatMap(d => d.tags)));
  
  const filteredDiscussions = mockDiscussions.filter(discussion => {
    const matchesSearch = discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          discussion.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTags = selectedTags.length === 0 || 
                        selectedTags.every(tag => discussion.tags.includes(tag));
    
    return matchesSearch && matchesTags;
  });
  
  const handleTagSelect = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  
  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReply.trim() || !selectedDiscussion) return;
    
    toast({
      title: "Reply posted",
      description: "Your response has been posted successfully.",
    });
    
    // In a real app, we would update the state or call an API
    setNewReply('');
  };
  
  const handleNewPostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostTitle.trim() || !newPostContent.trim()) return;
    
    toast({
      title: "Question posted",
      description: "Your question has been posted successfully.",
    });
    
    // In a real app, we would update the state or call an API
    setNewPostTitle('');
    setNewPostContent('');
    setNewPostTags('');
  };
  
  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };
  
  if (selectedDiscussion) {
    return (
      <MainLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={() => setSelectedDiscussion(null)}>
              ← Back to Discussions
            </Button>
            <Badge variant={selectedDiscussion.solved ? "default" : "outline"} className={selectedDiscussion.solved ? "bg-green-500" : ""}>
              {selectedDiscussion.solved ? "Solved" : "Unsolved"}
            </Badge>
          </div>
          
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle className="text-xl md:text-2xl">{selectedDiscussion.title}</CardTitle>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <div className="flex items-center gap-2">
                      <img 
                        src={selectedDiscussion.author.avatar} 
                        alt={selectedDiscussion.author.name} 
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="text-sm font-medium">{selectedDiscussion.author.name}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(selectedDiscussion.createdAt)}
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedDiscussion.tags.map(tag => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                <p>{selectedDiscussion.content}</p>
              </div>
              <div className="flex items-center justify-between mt-6">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ThumbsUp size={16} />
                  {selectedDiscussion.likes}
                </Button>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MessageSquare size={14} />
                  {selectedDiscussion.replies.length} replies
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Responses</h3>
            
            {selectedDiscussion.replies.length > 0 ? (
              <motion.div 
                className="space-y-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {selectedDiscussion.replies.map((reply) => (
                  <motion.div key={reply.id} variants={itemVariants}>
                    <Card className={reply.isAnswer ? "border-green-500" : ""}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <img 
                              src={reply.author.avatar} 
                              alt={reply.author.name} 
                              className="w-6 h-6 rounded-full"
                            />
                            <div>
                              <span className="text-sm font-medium">{reply.author.name}</span>
                              <span className="text-xs text-muted-foreground ml-2">
                                {formatDate(reply.createdAt)}
                              </span>
                            </div>
                          </div>
                          {reply.isAnswer && (
                            <Badge className="bg-green-500">Verified Answer</Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="prose prose-sm max-w-none">
                          {reply.content.split('\n').map((paragraph, index) => {
                            if (paragraph.includes('```')) {
                              const parts = paragraph.split('```');
                              return (
                                <React.Fragment key={index}>
                                  {parts[0] && <p>{parts[0]}</p>}
                                  {parts[1] && (
                                    <div className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto my-2 font-mono text-sm">
                                      {parts[1]}
                                    </div>
                                  )}
                                  {parts[2] && <p>{parts[2]}</p>}
                                </React.Fragment>
                              );
                            }
                            return <p key={index}>{paragraph}</p>;
                          })}
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <Button variant="ghost" size="sm" className="gap-2">
                            <ThumbsUp size={16} />
                            {reply.likes}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-8">
                <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium">No responses yet</h3>
                <p className="text-muted-foreground">Be the first to respond to this question!</p>
              </div>
            )}
            
            <Card>
              <CardHeader>
                <CardTitle>Your Response</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleReplySubmit}>
                  <Textarea 
                    placeholder="Write your answer here..." 
                    className="min-h-[150px]"
                    value={newReply}
                    onChange={(e) => setNewReply(e.target.value)}
                  />
                  <div className="flex justify-end mt-4">
                    <Button 
                      type="submit" 
                      className="bg-campus-600 hover:bg-campus-700 gap-2"
                      disabled={!newReply.trim()}
                    >
                      <Send size={16} />
                      Post Response
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
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
            <h1 className="text-2xl font-bold tracking-tight">Doubt Discussion</h1>
            <p className="text-muted-foreground">Ask questions and get answers from faculty and peers</p>
          </div>
          <Button className="bg-campus-600 hover:bg-campus-700 gap-2">
            <MessageSquare size={16} />
            Ask a Question
          </Button>
        </div>
        
        <Tabs defaultValue="browse">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="browse">Browse Questions</TabsTrigger>
            <TabsTrigger value="ask">Ask a Question</TabsTrigger>
          </TabsList>
          
          <TabsContent value="browse">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-3/4">
                <div className="mb-6">
                  <div className="flex flex-col sm:flex-row gap-4 items-center">
                    <div className="relative w-full">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Search questions..."
                        className="pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Button variant="outline" className="gap-2">
                      <Filter size={16} />
                      Filters
                    </Button>
                  </div>
                </div>
                
                <motion.div 
                  className="space-y-4"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {filteredDiscussions.map((discussion) => (
                    <motion.div key={discussion.id} variants={itemVariants}>
                      <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedDiscussion(discussion)}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <CardTitle className="text-lg">{discussion.title}</CardTitle>
                            <Badge variant={discussion.solved ? "default" : "outline"} className={discussion.solved ? "bg-green-500" : ""}>
                              {discussion.solved ? "Solved" : "Unsolved"}
                            </Badge>
                          </div>
                          <CardDescription className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <img 
                                src={discussion.author.avatar} 
                                alt={discussion.author.name} 
                                className="w-5 h-5 rounded-full"
                              />
                              <span>{discussion.author.name}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock size={14} />
                              <span>{formatDate(discussion.createdAt)}</span>
                            </div>
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600 line-clamp-2">{discussion.content}</p>
                          <div className="flex flex-wrap gap-2 mt-3">
                            {discussion.tags.map(tag => (
                              <Badge key={tag} variant="outline">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                        <CardFooter className="border-t pt-3 flex justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <ThumbsUp size={16} className="text-muted-foreground" />
                              <span className="text-sm">{discussion.likes}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageSquare size={16} className="text-muted-foreground" />
                              <span className="text-sm">{discussion.replies.length}</span>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="gap-1">
                            View Discussion
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                  
                  {filteredDiscussions.length === 0 && (
                    <div className="text-center py-12">
                      <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium">No discussions found</h3>
                      <p className="text-muted-foreground">Try changing your search query or filters</p>
                    </div>
                  )}
                </motion.div>
              </div>
              
              <div className="md:w-1/4">
                <Card>
                  <CardHeader>
                    <CardTitle>Filter by Tags</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {allTags.map(tag => (
                        <Badge 
                          key={tag}
                          variant={selectedTags.includes(tag) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => handleTagSelect(tag)}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle>Guidelines</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-2">
                    <p>• Be specific about your problem</p>
                    <p>• Include relevant code snippets</p>
                    <p>• Check if your question has been asked before</p>
                    <p>• Use appropriate tags</p>
                    <p>• Be respectful and helpful when responding</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="ask">
            <Card>
              <CardHeader>
                <CardTitle>Ask a Question</CardTitle>
                <CardDescription>
                  Be specific and include all relevant details to get the best answers.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleNewPostSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium mb-1">Title</label>
                    <Input 
                      id="title" 
                      placeholder="e.g., How to implement binary search in Python?" 
                      value={newPostTitle}
                      onChange={(e) => setNewPostTitle(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="content" className="block text-sm font-medium mb-1">Description</label>
                    <Textarea 
                      id="content" 
                      placeholder="Describe your problem in detail..." 
                      className="min-h-[200px]"
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="tags" className="block text-sm font-medium mb-1">Tags</label>
                    <Input 
                      id="tags" 
                      placeholder="e.g., Python, Algorithms (comma separated)" 
                      value={newPostTags}
                      onChange={(e) => setNewPostTags(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button 
                      type="submit" 
                      className="bg-campus-600 hover:bg-campus-700"
                      disabled={!newPostTitle.trim() || !newPostContent.trim()}
                    >
                      Post Question
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default DoubtDiscussion;
