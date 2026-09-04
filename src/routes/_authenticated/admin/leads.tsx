import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Search, Phone, Mail, Calendar, Home, MapPin, Building2, StickyNote, MoreHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { listLeads, updateLeadStatus, addFollowUpNote } from "@/lib/leads.functions";

export const Route = createFileRoute("/_authenticated/admin/leads")({
  head: () => ({
    meta: [
      { title: "Lead Dashboard — Los Gallos Movers" },
      { name: "description", content: "Admin dashboard for managing Los Gallos Movers leads." },
    ],
  }),
  component: LeadsDashboard,
});

const statusOptions = ["new", "contacted", "quoted", "booked", "closed", "lost"];

const statusColor: Record<string, string> = {
  new: "bg-blue-100 text-blue-800 hover:bg-blue-100",
  contacted: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
  quoted: "bg-purple-100 text-purple-800 hover:bg-purple-100",
  booked: "bg-green-100 text-green-800 hover:bg-green-100",
  closed: "bg-gray-100 text-gray-800 hover:bg-gray-100",
  lost: "bg-red-100 text-red-800 hover:bg-red-100",
};

function LeadsDashboard() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const fetchLeads = useServerFn(listLeads);

  const { data, isLoading } = useQuery({
    queryKey: ["leads"],
    queryFn: () => fetchLeads(),
  });

  const leads = data?.leads ?? [];

  const filtered = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      (lead.email?.toLowerCase() ?? "").includes(search.toLowerCase()) ||
      (lead.phone ?? "").includes(search);
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl text-foreground">Lead dashboard</h1>
          <p className="text-sm text-muted-foreground">Manage customer intake and follow-ups.</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search leads…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              {statusOptions.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">Loading leads…</p>
      ) : filtered.length === 0 ? (
        <p className="text-muted-foreground">No leads match your filters.</p>
      ) : (
        <div className="grid gap-4">
          {filtered.map((lead) => (
            <LeadCard key={lead.id} lead={lead} />
          ))}
        </div>
      )}
    </div>
  );

  function LeadCard({ lead }: { lead: any }) {
    const [note, setNote] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const updateStatus = useServerFn(updateLeadStatus);
    const addNote = useServerFn(addFollowUpNote);

    async function onStatusChange(status: string) {
      try {
        await updateStatus({ data: { id: lead.id, status } });
        queryClient.invalidateQueries({ queryKey: ["leads"] });
        toast.success("Status updated");
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Could not update status");
      }
    }

    async function onAddNote() {
      if (!note.trim()) return;
      try {
        await addNote({ data: { id: lead.id, note: note.trim() } });
        setNote("");
        queryClient.invalidateQueries({ queryKey: ["leads"] });
        toast.success("Note added");
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Could not add note");
      }
    }

    return (
      <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-foreground">{lead.name}</h2>
              <Badge className={statusColor[lead.status] ?? "bg-muted text-muted-foreground"}>{lead.status}</Badge>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              {lead.phone && (
                <a href={`tel:${lead.phone.replace(/\D/g, "")}`} className="flex items-center gap-1 hover:text-foreground">
                  <Phone className="h-3.5 w-3.5" /> {lead.phone}
                </a>
              )}
              {lead.email && (
                <a href={`mailto:${lead.email}`} className="flex items-center gap-1 hover:text-foreground">
                  <Mail className="h-3.5 w-3.5" /> {lead.email}
                </a>
              )}
              {lead.business && (
                <span className="flex items-center gap-1">
                  <Building2 className="h-3.5 w-3.5" /> {lead.business}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Select value={lead.status} onValueChange={onStatusChange}>
              <SelectTrigger className="w-[130px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="icon">
                  <StickyNote className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>Follow-up notes</DialogTitle>
                  <DialogDescription>{lead.name}</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-2">
                  <div className="max-h-48 overflow-y-auto rounded-md bg-muted/50 p-3 text-sm whitespace-pre-line">
                    {lead.follow_up_notes || "No notes yet."}
                  </div>
                  <Textarea
                    placeholder="Add a note…"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={3}
                  />
                  <Button onClick={onAddNote} disabled={!note.trim()}>
                    Add note
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="mt-4 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2 lg:grid-cols-4">
          {lead.from_address && (
            <div className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-3.5 w-3.5 flex-none" />
              <span>From: {lead.from_address}</span>
            </div>
          )}
          {lead.to_address && (
            <div className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-3.5 w-3.5 flex-none" />
              <span>To: {lead.to_address}</span>
            </div>
          )}
          {lead.move_date && (
            <div className="flex items-center gap-2">
              <Calendar className="h-3.5 w-3.5 flex-none" />
              <span>Move: {lead.move_date}</span>
            </div>
          )}
          {lead.home_size && (
            <div className="flex items-center gap-2">
              <Home className="h-3.5 w-3.5 flex-none" />
              <span>Size: {lead.home_size}</span>
            </div>
          )}
        </div>

        {lead.notes && (
          <p className="mt-3 border-t border-border pt-3 text-sm text-muted-foreground">
            {lead.notes}
          </p>
        )}
      </div>
    );
  }
}
