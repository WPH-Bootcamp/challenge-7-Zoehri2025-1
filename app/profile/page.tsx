"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserSidebar } from "@/components/UserSidebar";

export default function ProfilePage() {
  const [name, setName] = useState("Johndoe");
  const [email, setEmail] = useState("johndoe@email.com");
  const [phone, setPhone] = useState("081234567890");

  const handleUpdate = () => {
    // TODO: Submit profile update to API
  };

  return (
    <div className="min-h-dvh bg-white flex flex-col">
      <Header />
      <div className="flex flex-1">
        <UserSidebar currentPath="/profile" />

        <main className="flex-1 py-6 sm:py-8 lg:py-12">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
            <h1 className="text-xl sm:text-2xl font-display font-extrabold text-[#0a0d12] mb-6">
              Profile
            </h1>

            <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 sm:p-8">
                {/* Avatar */}
                <div className="flex justify-center mb-6 sm:mb-8">
                  <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-[#FF6B35] flex items-center justify-center text-white font-bold text-2xl sm:text-3xl">
                    JD
                  </div>
                </div>

                {/* Profile fields - Figma 37412-5482: label left, value right */}
                <div className="space-y-4 sm:space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <label className="text-sm font-medium text-[#0a0d12] shrink-0">
                      Name
                    </label>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="sm:max-w-[280px] sm:ml-auto"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <label className="text-sm font-medium text-[#0a0d12] shrink-0">
                      Email
                    </label>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="sm:max-w-[280px] sm:ml-auto"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <label className="text-sm font-medium text-[#0a0d12] shrink-0">
                      Nomor Handphone
                    </label>
                    <Input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="sm:max-w-[280px] sm:ml-auto"
                    />
                  </div>
                </div>

                {/* Update Profile button */}
                <div className="mt-8 flex justify-center">
                  <Button
                    onClick={handleUpdate}
                    className="px-8 sm:px-12 h-11 sm:h-12 rounded-xl font-bold text-sm sm:text-base bg-[#c12116] hover:bg-[#a01a12]"
                  >
                    Update Profile
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
