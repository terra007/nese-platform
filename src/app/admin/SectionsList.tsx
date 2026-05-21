"use client";

import { useState, useTransition } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { PageSection } from "@/lib/sections";
import {
  reorderSections,
  toggleVisibility,
  deleteSectionById,
} from "./actions";

// ── Drag handle icon ──────────────────────────────────────────────────────────
function GripIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <circle cx="7" cy="5"  r="1.25" />
      <circle cx="7" cy="10" r="1.25" />
      <circle cx="7" cy="15" r="1.25" />
      <circle cx="13" cy="5"  r="1.25" />
      <circle cx="13" cy="10" r="1.25" />
      <circle cx="13" cy="15" r="1.25" />
    </svg>
  );
}

// ── Single draggable row ──────────────────────────────────────────────────────
function SortableRow({
  section,
  onToggle,
  onDelete,
}: {
  section: PageSection;
  onToggle: (id: string, visible: boolean) => void;
  onDelete: (id: string, slug: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 10 : undefined,
        opacity: isDragging ? 0 : 1,
      }}
      className="flex items-center gap-3 px-4 py-4 border-b border-white/[0.04] last:border-0 bg-zinc-950 hover:bg-zinc-900/40 transition-colors"
    >
      {/* Drag handle */}
      <button
        {...attributes}
        {...listeners}
        className="text-zinc-700 hover:text-zinc-400 cursor-grab active:cursor-grabbing touch-none shrink-0 p-1"
        aria-label="Drag to reorder"
      >
        <GripIcon />
      </button>

      {/* Title + type */}
      <div className="flex-1 min-w-0">
        <p className="text-white text-sm">{section.title}</p>
        <p className="text-zinc-700 text-[10px] uppercase tracking-[0.15em] mt-0.5">
          {section.type === "builtin" ? "Built-in" : "Custom"}
        </p>
      </div>

      {/* Visibility toggle */}
      <button
        onClick={() => onToggle(section.id, !section.visible)}
        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded border transition-colors shrink-0 ${
          section.visible
            ? "toggle-visible"
            : "border-white/10 text-zinc-600 hover:text-zinc-300 hover:border-white/20"
        }`}
      >
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            section.visible ? "bg-[var(--color-accent)]" : "bg-zinc-700"
          }`}
        />
        {section.visible ? "Visible" : "Hidden"}
      </button>

      {/* Delete (custom only) */}
      {section.type === "custom" ? (
        <button
          onClick={() => {
            if (confirm("Delete this section? This cannot be undone.")) {
              onDelete(section.id, section.slug);
            }
          }}
          className="w-8 h-8 flex items-center justify-center text-zinc-700 hover:text-red-400 transition-colors shrink-0"
          title="Delete section"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
        </button>
      ) : (
        <div className="w-8 shrink-0" />
      )}
    </div>
  );
}

// ── Ghost overlay shown while dragging ────────────────────────────────────────
function DragGhost({ section }: { section: PageSection | null }) {
  if (!section) return null;
  return (
    <div className="flex items-center gap-3 px-4 py-4 bg-zinc-900 border accent-border-30 shadow-2xl rounded w-full">
      <span className="text-zinc-500 p-1"><GripIcon /></span>
      <div className="flex-1 min-w-0">
        <p className="text-white text-sm">{section.title}</p>
        <p className="text-zinc-700 text-[10px] uppercase tracking-[0.15em] mt-0.5">
          {section.type === "builtin" ? "Built-in" : "Custom"}
        </p>
      </div>
    </div>
  );
}

// ── Main exported component ───────────────────────────────────────────────────
export default function SectionsList({
  initialSections,
}: {
  initialSections: PageSection[];
}) {
  const [sections, setSections] = useState(initialSections);
  const [activeSection, setActiveSection] = useState<PageSection | null>(null);
  const [, startTransition] = useTransition();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  function handleDragStart(event: DragStartEvent) {
    setActiveSection(sections.find((s) => s.id === event.active.id) ?? null);
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveSection(null);
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIdx = sections.findIndex((s) => s.id === active.id);
    const newIdx = sections.findIndex((s) => s.id === over.id);
    const reordered = arrayMove(sections, oldIdx, newIdx);

    setSections(reordered); // optimistic update
    startTransition(() => {
      reorderSections(reordered.map((s) => s.id));
    });
  }

  function handleToggle(id: string, visible: boolean) {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, visible } : s))
    );
    startTransition(() => {
      toggleVisibility(id, visible);
    });
  }

  function handleDelete(id: string, slug: string) {
    setSections((prev) => prev.filter((s) => s.id !== id));
    startTransition(() => {
      deleteSectionById(id, slug);
    });
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="border border-white/[0.06] overflow-hidden">
        <SortableContext
          items={sections.map((s) => s.id)}
          strategy={verticalListSortingStrategy}
        >
          {sections.map((section) => (
            <SortableRow
              key={section.id}
              section={section}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          ))}
        </SortableContext>
      </div>

      <DragOverlay>
        <DragGhost section={activeSection} />
      </DragOverlay>
    </DndContext>
  );
}
