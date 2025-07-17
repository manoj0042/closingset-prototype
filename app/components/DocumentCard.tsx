'use client';

import Image from "next/image";
import Link from "next/link";

interface DocumentCardProps {
  name: string;
  label: string;
  description: string;
}

export default function DocumentCard({ name, label, description }: DocumentCardProps) {
  return (
    <li className="flex items-start p-5 bg-white rounded-xl shadow hover:shadow-md transition border border-gray-200">
      <Image
        src="/icons/pdf-icon.svg" // ✅ red icon path
        alt="PDF Icon"
        width={40}
        height={40}
        className="mr-4 mt-1"
      />
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-indigo-800">{label}</h3>
        <p className="text-sm text-gray-600 mb-3">{description}</p>
        <div className="flex gap-4">
          <Link
            href={`/closing-set/${name}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-1.5 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition"
          >
            👁️ View
          </Link>
          <Link
            href={`/closing-set/${name}`}
            download
            className="inline-block px-4 py-1.5 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition"
          >
            📥 Download
          </Link>
        </div>
      </div>
    </li>
  );
}
