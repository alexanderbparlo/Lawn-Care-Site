import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { getClientDb } from "./firebase";

// ─── Types ───────────────────────────────────────────────────────────────────

export type BookingStatus = "Pending" | "Confirmed" | "Completed" | "Cancelled";
export type QuoteStatus = "New" | "In Progress" | "Quoted" | "Closed";
export type PaymentMethod = "Cash" | "Venmo" | "Zelle" | "Other";
export type ServiceType = "Lawn Mowing" | "Edging" | "Leaf Blowing";
export type TimelineType =
  | "As soon as possible"
  | "Within 2 weeks"
  | "Within a month"
  | "Just exploring";

export interface Booking {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: { street: string; city: string; state: string; zip: string };
  services: ServiceType[];
  preferredDate: string;
  preferredTime: "Morning" | "Afternoon";
  notes: string;
  status: BookingStatus;
  submittedAt?: Timestamp;
}

export interface Quote {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: { street: string; city: string; state: string; zip: string };
  services: ServiceType[];
  timeline: TimelineType;
  notes: string;
  status: QuoteStatus;
  submittedAt?: Timestamp;
}

export interface Payment {
  id?: string;
  customerName: string;
  serviceDate: string;
  services: ServiceType[];
  amount: number;
  paymentMethod: PaymentMethod;
  notes: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

// ─── Bookings ─────────────────────────────────────────────────────────────────

export async function createBooking(data: Omit<Booking, "id" | "submittedAt" | "status">) {
  return addDoc(collection(getClientDb(), "bookings"), {
    ...data,
    status: "Pending",
    submittedAt: serverTimestamp(),
  });
}

export async function getBookings(): Promise<Booking[]> {
  const q = query(collection(getClientDb(), "bookings"), orderBy("preferredDate", "asc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Booking));
}

export async function updateBookingStatus(id: string, status: BookingStatus) {
  return updateDoc(doc(getClientDb(), "bookings", id), { status });
}

// ─── Quotes ──────────────────────────────────────────────────────────────────

export async function createQuote(data: Omit<Quote, "id" | "submittedAt" | "status">) {
  return addDoc(collection(getClientDb(), "quotes"), {
    ...data,
    status: "New",
    submittedAt: serverTimestamp(),
  });
}

export async function getQuotes(): Promise<Quote[]> {
  const q = query(collection(getClientDb(), "quotes"), orderBy("submittedAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Quote));
}

export async function updateQuoteStatus(id: string, status: QuoteStatus) {
  return updateDoc(doc(getClientDb(), "quotes", id), { status });
}

// ─── Payments ────────────────────────────────────────────────────────────────

export async function createPayment(data: Omit<Payment, "id" | "createdAt" | "updatedAt">) {
  return addDoc(collection(getClientDb(), "payments"), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function getPayments(): Promise<Payment[]> {
  const q = query(collection(getClientDb(), "payments"), orderBy("serviceDate", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Payment));
}

export async function updatePayment(id: string, data: Partial<Omit<Payment, "id" | "createdAt">>) {
  return updateDoc(doc(getClientDb(), "payments", id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deletePayment(id: string) {
  return deleteDoc(doc(getClientDb(), "payments", id));
}
