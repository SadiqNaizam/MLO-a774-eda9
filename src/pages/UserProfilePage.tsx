import React, { useState } from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, useForm } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Edit3, Save, MapPin, CreditCardIcon, Bell, LogOut } from 'lucide-react';

// Form Schema for Profile
const profileFormSchema = z.object({
  fullName: z.string().min(2, "Full name is too short."),
  email: z.string().email("Invalid email address."),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number.").optional(),
});
type ProfileFormValues = z.infer<typeof profileFormSchema>;

// Sample Data
const sampleUser = {
  fullName: 'Alice Wonderland',
  email: 'alice.wonderland@example.com',
  phone: '+1234567890',
  avatarUrl: 'https://i.pravatar.cc/150?u=alice',
};

const sampleOrderHistory = [
  { id: 'ORD001', date: '2024-07-15', restaurant: 'Pizza Palace', total: 25.99, status: 'Delivered' },
  { id: 'ORD002', date: '2024-07-10', restaurant: 'Spice Route', total: 32.50, status: 'Delivered' },
  { id: 'ORD003', date: '2024-06-28', restaurant: 'Burger Bliss', total: 18.75, status: 'Cancelled' },
];

const UserProfilePage = () => {
  console.log('UserProfilePage loaded');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: sampleUser,
  });

  const onProfileSubmit = (data: ProfileFormValues) => {
    console.log('Profile updated:', data);
    // Simulate API call to save data
    setIsEditingProfile(false);
    // Update sampleUser or state if needed
    alert("Profile updated successfully!");
  };
  
  const handleLogout = () => {
    console.log("User logged out");
    alert("Logging out (simulation)...");
    // Actual logout logic: clear tokens, redirect to login page
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <NavigationMenu />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-800">Your Account</h1>
        </header>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column: Profile Card */}
          <div className="md:col-span-1 space-y-6">
            <Card className="shadow-lg">
              <CardHeader className="items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={sampleUser.avatarUrl} alt={sampleUser.fullName} />
                  <AvatarFallback>{sampleUser.fullName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-2xl">{form.getValues().fullName}</CardTitle>
                <CardDescription>{form.getValues().email}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="outline" onClick={() => alert('Change Profile Picture functionality not implemented.')}>
                  Change Picture
                </Button>
              </CardContent>
            </Card>
             <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl flex items-center"><LogOut className="mr-2 h-5 w-5"/>Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="destructive" className="w-full" onClick={handleLogout}>
                  Logout
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Details and Settings */}
          <div className="md:col-span-2 space-y-8">
            {/* Personal Details Form */}
            <Card className="shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between">
                <div >
                    <CardTitle className="text-xl">Personal Details</CardTitle>
                    <CardDescription>Manage your personal information.</CardDescription>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsEditingProfile(!isEditingProfile)}>
                  {isEditingProfile ? <Save className="h-5 w-5" /> : <Edit3 className="h-5 w-5" />}
                </Button>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onProfileSubmit)} className="space-y-4">
                    <FormField control={form.control} name="fullName" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl><Input {...field} disabled={!isEditingProfile} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="email" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl><Input type="email" {...field} disabled={!isEditingProfile} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="phone" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl><Input type="tel" {...field} disabled={!isEditingProfile} /></FormControl>
                        <FormDescription>Optional. Used for delivery updates.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )} />
                    {isEditingProfile && (
                      <Button type="submit" className="w-full sm:w-auto">
                        <Save className="mr-2 h-4 w-4" /> Save Changes
                      </Button>
                    )}
                  </form>
                </Form>
              </CardContent>
            </Card>

            {/* Accordion for Other Settings */}
            <Accordion type="multiple" className="w-full space-y-4">
              <Card className="shadow-lg">
                <AccordionItem value="addresses" className="border-b-0">
                    <AccordionTrigger className="px-6 py-4 text-xl font-semibold">
                        <div className="flex items-center">
                            <MapPin className="mr-3 h-5 w-5 text-primary"/> Saved Addresses
                        </div>
                    </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <p className="text-gray-600 mb-2">Manage your saved delivery locations.</p>
                    {/* Placeholder for address list and add new address button */}
                    <div className="border p-3 rounded-md bg-gray-50 text-sm text-gray-700">123 Main St, Anytown, USA (Primary) <Button variant="link" size="sm" className="ml-2">Edit</Button></div>
                    <Button variant="outline" className="mt-3">Add New Address</Button>
                  </AccordionContent>
                </AccordionItem>
              </Card>
              
              <Card className="shadow-lg">
                <AccordionItem value="payment" className="border-b-0">
                     <AccordionTrigger className="px-6 py-4 text-xl font-semibold">
                        <div className="flex items-center">
                            <CreditCardIcon className="mr-3 h-5 w-5 text-primary"/> Payment Methods
                        </div>
                    </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <p className="text-gray-600 mb-2">Manage your saved payment options.</p>
                    {/* Placeholder for payment methods list and add new payment button */}
                    <div className="border p-3 rounded-md bg-gray-50 text-sm text-gray-700">Visa **** **** **** 1234 <Button variant="link" size="sm" className="ml-2">Remove</Button></div>
                    <Button variant="outline" className="mt-3">Add New Payment Method</Button>
                  </AccordionContent>
                </AccordionItem>
              </Card>

              <Card className="shadow-lg">
                 <AccordionItem value="notifications" className="border-b-0">
                    <AccordionTrigger className="px-6 py-4 text-xl font-semibold">
                        <div className="flex items-center">
                            <Bell className="mr-3 h-5 w-5 text-primary"/> Notification Settings
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4">
                        <div className="flex items-center justify-between">
                        <FormLabel htmlFor="notifications-switch" className="text-gray-700">Enable Order Updates & Promotions</FormLabel>
                        <Switch
                            id="notifications-switch"
                            checked={notificationsEnabled}
                            onCheckedChange={setNotificationsEnabled}
                        />
                        </div>
                        <p className="text-sm text-gray-500 mt-1">Receive updates about your orders and special offers.</p>
                    </AccordionContent>
                 </AccordionItem>
              </Card>
            </Accordion>

            {/* Order History Table */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Order History</CardTitle>
                <CardDescription>View your past orders.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Restaurant</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sampleOrderHistory.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>{order.restaurant}</TableCell>
                        <TableCell>${order.total.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge variant={order.status === 'Delivered' ? 'default' : (order.status === 'Cancelled' ? 'destructive' : 'secondary')}>
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm" onClick={() => alert(`View details for ${order.id}`)}>View Details</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                     {sampleOrderHistory.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center text-gray-500 py-4">No orders yet.</TableCell>
                        </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <footer className="py-6 text-center text-sm text-gray-500 border-t bg-white">
        Manage your FoodApp experience.
      </footer>
    </div>
  );
};

export default UserProfilePage;