// app/read/[bookId]/layout.tsx
export default function ReaderLayout({ children }) {
  return (
    <html>
      <body>
        {children} {/* 只渲染阅读器，不包含全局导航/边栏 */}
      </body>
    </html>
  );
}
