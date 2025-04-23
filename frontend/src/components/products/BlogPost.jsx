import React from 'react'
import { blogsData } from '../../data/blogData'

function BlogPost() {
  return (
    <div className="container mx-auto p-6">
    <h1 className="text-3xl font-bold text-center mb-8">Blog</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogsData.map((post) => (
        <div key={post.slug} className="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-56 object-cover"
          />
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h2>
            <p className="text-sm text-gray-500 mb-2">{post.date} | {post.author}</p>
            <p className="text-base text-gray-700 mb-4">{post.content.substring(0, 150)}...</p>
            <div className="flex items-center mb-4">
              {post.tags.map((tag, index) => (
                <span key={index} className="text-sm text-blue-500 mr-2">
                  #{tag}
                </span>
              ))}
            </div>
            <a href={`/blog/${post.slug}`} className="text-blue-500 font-semibold">
              Read More
            </a>
          </div>
        </div>
      ))}
    </div>
  </div>
  )
}

export default BlogPost