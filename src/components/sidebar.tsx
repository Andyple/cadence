"use client";

import { useSidebar } from "./sidebar-context";
import { X, Music, Shield, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface Playlist {
  id: string;
  name: string;
  images?: { url: string }[];
}

interface SidebarProps {
  playlists: Playlist[];
}

export function Sidebar({ playlists }: SidebarProps) {
  const {
    isOpen,
    closeSidebar,
    autoDjFocusEnabled,
    setAutoDjFocusEnabled,
    autoDjBreakEnabled,
    setAutoDjBreakEnabled,
    smartPausingEnabled,
    setSmartPausingEnabled,
    focusPlaylistId,
    setFocusPlaylistId,
    breakPlaylistId,
    setBreakPlaylistId,
  } = useSidebar();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full w-80 bg-zinc-950 border-r border-zinc-800 z-50 transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-800">
            <h2 className="text-lg font-bold">Focus Settings</h2>
            <button
              onClick={closeSidebar}
              className="p-1 hover:bg-zinc-800 rounded-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            {/* Focus Auto-DJ Toggle */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Zap className={cn("w-5 h-5", autoDjFocusEnabled ? "text-yellow-400" : "text-zinc-500")} />
                  <div>
                    <div className="font-semibold text-sm">Focus Auto-DJ</div>
                    <div className="text-xs text-zinc-500">Play music during focus</div>
                  </div>
                </div>
                <button
                  onClick={() => setAutoDjFocusEnabled(!autoDjFocusEnabled)}
                  className={cn(
                    "w-12 h-6 rounded-full transition-colors relative focus:outline-none focus:ring-2 focus:ring-zinc-700",
                    autoDjFocusEnabled ? "bg-green-500" : "bg-zinc-800"
                  )}
                >
                  <div
                    className={cn(
                      "absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform",
                      autoDjFocusEnabled ? "translate-x-6" : "translate-x-0"
                    )}
                  />
                </button>
              </div>

              {autoDjFocusEnabled && (
                <div className="space-y-3 pt-2 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="flex items-center gap-2 text-xs font-bold text-zinc-500 uppercase tracking-wider">
                    Focus Playlist
                  </div>
                  <select
                    value={focusPlaylistId || ""}
                    onChange={(e) => setFocusPlaylistId(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-800 transition-all appearance-none cursor-pointer hover:border-zinc-700"
                  >
                    <option value="">Select a playlist...</option>
                    {playlists.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Break Auto-DJ Toggle */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Music className={cn("w-5 h-5", autoDjBreakEnabled ? "text-green-400" : "text-zinc-500")} />
                  <div>
                    <div className="font-semibold text-sm">Break Auto-DJ</div>
                    <div className="text-xs text-zinc-500">Play music during breaks</div>
                  </div>
                </div>
                <button
                  onClick={() => setAutoDjBreakEnabled(!autoDjBreakEnabled)}
                  className={cn(
                    "w-12 h-6 rounded-full transition-colors relative focus:outline-none focus:ring-2 focus:ring-zinc-700",
                    autoDjBreakEnabled ? "bg-green-500" : "bg-zinc-800"
                  )}
                >
                  <div
                    className={cn(
                      "absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform",
                      autoDjBreakEnabled ? "translate-x-6" : "translate-x-0"
                    )}
                  />
                </button>
              </div>

              {autoDjBreakEnabled && (
                <div className="space-y-3 pt-2 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="flex items-center gap-2 text-xs font-bold text-zinc-500 uppercase tracking-wider">
                    Break Playlist
                  </div>
                  <select
                    value={breakPlaylistId || ""}
                    onChange={(e) => setBreakPlaylistId(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-800 transition-all appearance-none cursor-pointer hover:border-zinc-700"
                  >
                    <option value="">Select a playlist...</option>
                    {playlists.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Smart Pausing Toggle */}
            <div className={cn("flex items-center justify-between transition-opacity duration-300", 
              (!autoDjFocusEnabled && !autoDjBreakEnabled) ? "opacity-50" : "opacity-100"
            )}>
              <div className="flex items-center gap-3">
                <Shield className={cn("w-5 h-5", smartPausingEnabled && (autoDjFocusEnabled || autoDjBreakEnabled) ? "text-blue-400" : "text-zinc-500")} />
                <div>
                  <div className="font-semibold text-sm">Smart Pausing</div>
                  <div className="text-xs text-zinc-500">Wait for track to finish</div>
                </div>
              </div>
              <button
                disabled={!autoDjFocusEnabled && !autoDjBreakEnabled}
                onClick={() => setSmartPausingEnabled(!smartPausingEnabled)}
                className={cn(
                  "w-12 h-6 rounded-full transition-colors relative focus:outline-none focus:ring-2 focus:ring-zinc-700 disabled:cursor-not-allowed",
                  smartPausingEnabled && (autoDjFocusEnabled || autoDjBreakEnabled) ? "bg-green-500" : "bg-zinc-800"
                )}
              >
                <div
                  className={cn(
                    "absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform",
                    smartPausingEnabled && (autoDjFocusEnabled || autoDjBreakEnabled) ? "translate-x-6" : "translate-x-0",
                    (!autoDjFocusEnabled && !autoDjBreakEnabled) ? "bg-zinc-500" : "bg-white"
                  )}
                />
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-zinc-800">
            <div className="flex items-center gap-3 text-zinc-500">
              <Music className="w-4 h-4" />
              <span className="text-xs italic">Syncing with Spotify...</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
