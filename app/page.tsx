// app/documents/page.tsx
import DocumentCard from "@/app/components/DocumentCard";

export default function DocumentsPage() {
  const documents = [
    {
      name: "01-Investment-Agreement.pdf",
      label: "Investment Agreement",
      description: "Outlines terms of investment between startup and investors.",
    },
    {
      name: "02-Shareholders-Agreement.pdf",
      label: "Shareholders Agreement",
      description: "Details the rights and obligations of shareholders.",
    },
    {
      name: "03-Trustee-Agreement.pdf",
      label: "Trustee Agreement",
      description: "Specifies the trustee's responsibilities over held shares.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold text-center text-indigo-700 mb-10">
        📁 Closing Set Documents
      </h1>

      <ul className="space-y-6">
        {documents.map((doc) => (
          <DocumentCard
            key={doc.name}
            name={doc.name}
            label={doc.label}
            description={doc.description}
          />
        ))}
      </ul>
    </div>
  );
}
