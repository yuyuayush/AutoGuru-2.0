"use client";

import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';
import { useMemo } from 'react';

// Dynamic import to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill-new'), {
    ssr: false,
    loading: () => <div className="h-40 bg-gray-50 animate-pulse rounded-md" />
});

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    label?: string;
}

export const RichTextEditor = ({ value, onChange, placeholder, label }: RichTextEditorProps) => {
    const modules = useMemo(() => ({
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'clean']
        ],
    }), []);

    return (
        <div className="space-y-1">
            {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
            <div className="rich-text-editor-wrapper">
                <ReactQuill
                    theme="snow"
                    value={value || ''}
                    onChange={onChange}
                    modules={modules}
                    placeholder={placeholder}
                    className="bg-white rounded-md"
                />
            </div>
            <style jsx global>{`
                .rich-text-editor-wrapper {
                    display: flex;
                    flex-direction: column;
                }
                .rich-text-editor-wrapper .quill {
                    display: flex;
                    flex-direction: column;
                }
                .rich-text-editor-wrapper .ql-toolbar {
                    border-top-left-radius: 0.375rem;
                    border-top-right-radius: 0.375rem;
                    border-color: #e5e7eb;
                    background-color: #f9fafb;
                }
                .rich-text-editor-wrapper .ql-container {
                    border-bottom-left-radius: 0.375rem;
                    border-bottom-right-radius: 0.375rem;
                    border-color: #e5e7eb;
                    height: 500px; /* Fixed height as requested */
                    font-size: 0.875rem;
                    display: flex;
                    flex-direction: column;
                }
                .rich-text-editor-wrapper .ql-editor {
                    flex: 1;
                    overflow-y: auto;
                }
            `}</style>
        </div>
    );
};
