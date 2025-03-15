import { redirect } from 'next/navigation';
import Link from 'next/link';

interface BlogPost {
  id: string;
  title: string;
  date: string;
}

// Mock data for blog posts
const blogPosts: BlogPost[] = [
  { id: '1', title: 'Getting Started with AI-Powered Blogging', date: '2023-10-15' },
  { id: '2', title: 'The Future of Content Creation', date: '2023-10-10' },
  { id: '3', title: 'Optimizing Your Blog for Search Engines', date: '2023-09-28' },
  { id: '4', title: 'Building a Community Around Your Blog', date: '2023-09-15' },
  { id: '5', title: 'Leveraging AI for Content Ideas', date: '2023-08-22' },
  { id: '6', title: 'The Ethics of AI in Content Creation', date: '2023-08-10' },
];

// Function to group posts by month
function groupPostsByMonth(posts: BlogPost[]) {
  const grouped: Record<string, BlogPost[]> = {};
  
  posts.forEach(post => {
    const date = new Date(post.date);
    const monthYear = `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
    
    if (!grouped[monthYear]) {
      grouped[monthYear] = [];
    }
    
    grouped[monthYear].push(post);
  });
  
  return grouped;
}

export default function Archive() {
  redirect('/');
} 