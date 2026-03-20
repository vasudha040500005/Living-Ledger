"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import {
  Plus,
  Trash2,
  Edit,
  Star,
  StarOff,
  LogOut,
  Eye,
  Home,
  Layers,
  MessageSquare,
  Settings,
} from "lucide-react";

interface Project {
  id: string;
  title: string;
  category: string;
  location: string | null;
  year: string | null;
  featured: boolean;
  images: string[];
  createdAt: string;
}

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [activeTab, setActiveTab] = useState<"projects" | "messages">("projects");
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/vendor-access");
    } else if (status === "authenticated" && session?.user?.role !== "VENDOR") {
      router.push("/");
    }
  }, [status, session, router]);

  useEffect(() => {
    if (session?.user?.role === "VENDOR") {
      fetchProjects();
      fetchMessages();
    }
  }, [session]);

  const fetchProjects = async () => {
    const res = await fetch("/api/projects");
    const data = await res.json();
    setProjects(data);
    setLoading(false);
  };

  const fetchMessages = async () => {
    const res = await fetch("/api/contact");
    const data = await res.json();
    setMessages(data);
  };

  const deleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    setDeleting(id);
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    setProjects((prev) => prev.filter((p) => p.id !== id));
    setDeleting(null);
  };

  const toggleFeatured = async (id: string, featured: boolean) => {
    await fetch(`/api/projects/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ featured: !featured }),
    });
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, featured: !featured } : p))
    );
  };

  const markRead = async (id: string) => {
    await fetch(`/api/contact/${id}`, { method: "PATCH" });
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, read: true } : m)));
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-walnut-700 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="font-lato text-sm text-walnut-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (session?.user?.role !== "VENDOR") return null;

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div className="min-h-screen bg-cream-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-walnut-950 flex-shrink-0 flex flex-col">
        <div className="p-6 border-b border-walnut-800">
          <p className="font-playfair text-lg text-cream-100">De`Sign | Premium Interior Design</p>
          <p className="font-lato text-xs text-walnut-500 tracking-widest uppercase mt-1">
            Vendor Dashboard
          </p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 text-walnut-400 hover:text-cream-100 hover:bg-walnut-800 rounded transition-colors font-lato text-sm"
          >
            <Home size={16} />
            View Website
          </Link>
          <button
            onClick={() => setActiveTab("projects")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-colors font-lato text-sm ${
              activeTab === "projects"
                ? "bg-walnut-700 text-cream-100"
                : "text-walnut-400 hover:text-cream-100 hover:bg-walnut-800"
            }`}
          >
            <Layers size={16} />
            Projects
            <span className="ml-auto bg-walnut-600 text-cream-200 text-xs px-2 py-0.5 rounded-full">
              {projects.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab("messages")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-colors font-lato text-sm ${
              activeTab === "messages"
                ? "bg-walnut-700 text-cream-100"
                : "text-walnut-400 hover:text-cream-100 hover:bg-walnut-800"
            }`}
          >
            <MessageSquare size={16} />
            Messages
            {unreadCount > 0 && (
              <span className="ml-auto bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
                {unreadCount}
              </span>
            )}
          </button>
        </nav>
        <div className="p-4 border-t border-walnut-800">
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full flex items-center gap-3 px-4 py-3 text-walnut-500 hover:text-red-400 hover:bg-walnut-900 rounded transition-colors font-lato text-sm"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        {/* Top Bar */}
        <header className="bg-white border-b border-cream-200 px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-playfair text-2xl text-walnut-800">
              {activeTab === "projects" ? "Projects" : "Messages"}
            </h1>
            <p className="font-lato text-xs text-walnut-500">
              {activeTab === "projects"
                ? `${projects.length} total projects`
                : `${messages.length} messages, ${unreadCount} unread`}
            </p>
          </div>
          {activeTab === "projects" && (
            <Link
              href="/dashboard/add-project"
              className="btn-primary inline-flex items-center gap-2 text-sm"
            >
              <Plus size={16} />
              Add Project
            </Link>
          )}
        </header>

        <div className="p-8">
          {/* Projects Tab */}
          {activeTab === "projects" && (
            <>
              {projects.length === 0 ? (
                <div className="text-center py-20">
                  <Layers size={48} className="mx-auto mb-4 text-walnut-300" />
                  <h3 className="font-playfair text-2xl text-walnut-500 mb-2">
                    No Projects Yet
                  </h3>
                  <p className="font-lato text-sm text-walnut-400 mb-6">
                    Add your first project to showcase your work.
                  </p>
                  <Link href="/dashboard/add-project" className="btn-primary inline-block">
                    Add First Project
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className="bg-white border border-cream-200 overflow-hidden"
                    >
                      <div className="relative h-48">
                        <Image
                          src={
                            project.images[0] ||
                            "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80"
                          }
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="bg-walnut-800/80 text-cream-100 text-xs px-2 py-1 font-lato">
                            {project.category}
                          </span>
                        </div>
                        {project.featured && (
                          <div className="absolute top-3 right-3">
                            <span className="bg-walnut-500 text-cream-50 text-xs px-2 py-1 font-lato">
                              Featured
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-playfair text-lg text-walnut-800 mb-1">
                          {project.title}
                        </h3>
                        <p className="font-lato text-xs text-walnut-500 mb-4">
                          {project.location} {project.year && `· ${project.year}`}
                        </p>
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/portfolio/${project.id}`}
                            className="flex items-center gap-1 text-xs text-walnut-600 hover:text-walnut-800 font-lato px-3 py-2 border border-cream-300 hover:border-walnut-400 transition-colors"
                          >
                            <Eye size={13} />
                            View
                          </Link>
                          <Link
                            href={`/dashboard/edit-project/${project.id}`}
                            className="flex items-center gap-1 text-xs text-walnut-600 hover:text-walnut-800 font-lato px-3 py-2 border border-cream-300 hover:border-walnut-400 transition-colors"
                          >
                            <Edit size={13} />
                            Edit
                          </Link>
                          <button
                            onClick={() => toggleFeatured(project.id, project.featured)}
                            title={project.featured ? "Remove from featured" : "Mark as featured"}
                            className="flex items-center gap-1 text-xs text-walnut-600 hover:text-walnut-800 font-lato px-3 py-2 border border-cream-300 hover:border-walnut-400 transition-colors"
                          >
                            {project.featured ? (
                              <StarOff size={13} />
                            ) : (
                              <Star size={13} />
                            )}
                          </button>
                          <button
                            onClick={() => deleteProject(project.id)}
                            disabled={deleting === project.id}
                            className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 font-lato px-3 py-2 border border-red-200 hover:border-red-400 transition-colors ml-auto"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Messages Tab */}
          {activeTab === "messages" && (
            <div className="space-y-4">
              {messages.length === 0 ? (
                <div className="text-center py-20">
                  <MessageSquare size={48} className="mx-auto mb-4 text-walnut-300" />
                  <h3 className="font-playfair text-2xl text-walnut-500">
                    No Messages Yet
                  </h3>
                </div>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`bg-white border p-6 ${
                      !msg.read ? "border-walnut-400" : "border-cream-200"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-playfair text-lg text-walnut-800">
                          {msg.name}
                          {!msg.read && (
                            <span className="ml-2 inline-block w-2 h-2 bg-walnut-500 rounded-full" />
                          )}
                        </p>
                        <p className="font-lato text-xs text-walnut-500">
                          {msg.email} · {new Date(msg.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <span className="bg-cream-100 text-walnut-600 text-xs px-3 py-1 font-lato">
                        {msg.subject}
                      </span>
                    </div>
                    <p className="font-lato text-sm text-walnut-700 leading-relaxed mb-4">
                      {msg.message}
                    </p>
                    {!msg.read && (
                      <button
                        onClick={() => markRead(msg.id)}
                        className="font-lato text-xs text-walnut-500 hover:text-walnut-700 underline underline-offset-2"
                      >
                        Mark as read
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
