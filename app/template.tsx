// Re-mounts on every navigation so the enter animation replays per page.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="fx-page">{children}</div>
}
