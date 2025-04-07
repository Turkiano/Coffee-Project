"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function CoffeeShopReservation() {
  const [location, setLocation] = useState("downtown");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState("12:00");
  const [guests, setGuests] = useState("2");
  const [seatingType, setSeatingType] = useState("indoor");

  const locations = {
    downtown: {
      name: "Downtown Café",
      description:
        "Our flagship location in the heart of the city with a modern urban vibe.",
      image:
        "https://i.postimg.cc/R0bDB7jH/a-3d-top-view-blueprint-of-a-cozy-coffee-VT0-Wh-OZz-RF297-JGTRTEllg-ogpa5-Rv4-Sk2-Dq-OLW6a2ul-Q.jpg",
    },
    riverside: {
      name: "Riverside Retreat",
      description:
        "Peaceful outdoor seating with beautiful views of the river and nature.",
      image: "/riverside.jpg", // replace this later
    },
    historic: {
      name: "Historic District",
      description:
        "Charming café housed in a renovated 19th century building with classic decor.",
      image: "/historic.jpg", // replace this later
    },
  };

  const currentLocation = locations[location as keyof typeof locations];

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">
        Reserve Your Table
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left side - Coffee shop images */}
        <div className="space-y-4">
          <Card className="overflow-hidden">
            <div className="relative h-[400px] w-full">
              <img
                src={currentLocation.image || "/placeholder.svg"}
                alt={currentLocation.name}
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-4">
              <h2 className="text-2xl font-semibold">{currentLocation.name}</h2>
              <p className="text-muted-foreground mt-2">
                {currentLocation.description}
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-3 gap-4">
            {Object.entries(locations).map(([key, loc]) => (
              <div
                key={key}
                className={`relative h-24 rounded-lg overflow-hidden cursor-pointer border-2 ${
                  location === key ? "border-primary" : "border-transparent"
                }`}
                onClick={() => setLocation(key)}
              >
                <img
                  src={loc.image || "/placeholder.svg"}
                  alt={loc.name}
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/30 flex items-end p-2">
                  <span className="text-white text-xs font-medium">
                    {loc.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right side - Booking form */}
        <div>
          <Card>
            <CardContent className="p-6">
              <form className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="location">Select Location</Label>
                  <Select value={location} onValueChange={setLocation}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="downtown">Downtown Café</SelectItem>
                      <SelectItem value="riverside">
                        Riverside Retreat
                      </SelectItem>
                      <SelectItem value="historic">
                        Historic District
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Seating Preference</Label>
                  <RadioGroup
                    value={seatingType}
                    onValueChange={setSeatingType}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="indoor" id="indoor" />
                      <Label htmlFor="indoor">Indoor</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="outdoor" id="outdoor" />
                      <Label htmlFor="outdoor">Outdoor</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="bar" id="bar" />
                      <Label htmlFor="bar">Bar</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Select Date</Label>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="border rounded-md"
                    disabled={(date) => date < new Date()}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="time">Select Time</Label>
                    <Select value={time} onValueChange={setTime}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 12 }).map((_, i) => {
                          const hour = i + 8; // Start from 8 AM
                          return (
                            <SelectItem key={`${hour}:00`} value={`${hour}:00`}>
                              {hour > 12
                                ? `${hour - 12}:00 PM`
                                : hour === 12
                                  ? "12:00 PM"
                                  : `${hour}:00 AM`}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="guests">Number of Guests</Label>
                    <Select value={guests} onValueChange={setGuests}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select guests" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 8 }).map((_, i) => (
                          <SelectItem key={i + 1} value={(i + 1).toString()}>
                            {i + 1} {i === 0 ? "Guest" : "Guests"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input id="name" placeholder="Enter your full name" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="(123) 456-7890" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="special-requests">Special Requests</Label>
                  <Textarea
                    id="special-requests"
                    placeholder="Any special requests or dietary requirements?"
                  />
                </div>

                <Button type="submit" className="w-full">
                  Confirm Reservation
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
