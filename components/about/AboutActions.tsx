"use client";

import { Calendar, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { redirectToWhatsApp } from "@/lib/whatsapp";
import { BookingForm } from "@/components/BookingForm";

export function AboutActions() {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <BookingForm
        variant="modal"
        triggerButton={
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-800 to-amber-600 hover:bg-primary-700 text-white px-8 py-4"
          >
            <Calendar className="w-5 h-5 mr-2" />
            Book Consultation
          </Button>
        }
      />

      <Button
        size="lg"
        variant="outline"
        className="border-primary-600 text-primary-700 hover:bg-blue-600 px-8 py-4 hover:text-white"
        onClick={() => redirectToWhatsApp("Hello, I'm interested in your services.")}
      >
        <MessageCircle className="w-5 h-5 mr-2" />
        Connect With Me
      </Button>
    </div>
  );
}
