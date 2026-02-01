"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserSidebar } from "@/components/UserSidebar";

export default function DeliveryAddressPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  return (
    <div className="min-h-dvh bg-white flex flex-col">
      <Header />
      <div className="flex flex-1">
        <UserSidebar currentPath="/delivery-address" />
        <main className="flex-1 py-6 sm:py-8 lg:py-12">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
            <h1 className="text-xl sm:text-2xl font-display font-extrabold text-[#0a0d12] mb-6">
              Delivery Address
            </h1>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
              <Input
                placeholder="Nama lengkap"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                type="tel"
                placeholder="No. HP"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <Input
                placeholder="Alamat lengkap"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <Button className="w-full">Simpan</Button>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
