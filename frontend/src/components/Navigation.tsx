"use client";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import LayerComponent from "@/components/LayerComponent";
import { useState } from "react";
import type { Layer } from "@/types/NeuralNet";

// TODO: I think this entire file is from the old design and can be removed entirely.
export default function Navigation() {
	const [genLayers] = useState<Layer[]>([
		{ type: "Dense", channels: 256, activation: "ReLU" },
		{ type: "Dense", channels: 784, activation: "Tanh" },
	]);
	const [discLayers] = useState<Layer[]>([
		{ type: "Dense", channels: 256, activation: "ReLU" },
		{ type: "Dense", channels: 128, activation: "ReLU" },
		{ type: "Dense", channels: 1, activation: "Sigmoid" },
	]);
	return (
		<div className="w-full max-w-6xl mx-auto p-12 space-y-6">
			<Tabs defaultValue="hyperparameters">
				<TabsList className="grid w-full grid-cols-3 lg:grid-cols-2">
					<TabsTrigger value="generator" className="lg:hidden">
						Generator
					</TabsTrigger>
					<TabsTrigger value="discriminator" className="lg:hidden">
						Discriminator
					</TabsTrigger>
					<TabsTrigger value="network" className="hidden lg:block">
						Network
					</TabsTrigger>
					<TabsTrigger value="hyperparameters">Hyperparameters</TabsTrigger>
				</TabsList>

				<TabsContent value="generator" className="lg:hidden">
					<Card>
						<CardHeader>
							<CardTitle>Generator</CardTitle>
							<CardDescription>
								Network architecture for generator neural net.
							</CardDescription>
							<CardContent className="space-y-4 p-0">
								{/* <DenseLayerComponent /> */}
								{/* <ConvLayerComponent /> */}
							</CardContent>
							<CardFooter className="flex justify-end p-1">
								<Button variant="outline" size="icon">
									<Plus className="h-4 w-4" />
								</Button>
							</CardFooter>
						</CardHeader>
					</Card>
				</TabsContent>
				<TabsContent value="discriminator" className="lg:hidden">
					<Card>
						<CardHeader>
							<CardTitle>Discriminator</CardTitle>
							<CardDescription>
								Network architecture for discriminator neural net.
							</CardDescription>
							<CardContent className="space-y-4 p-0">
								{genLayers.map((layer, index) => (
									<LayerComponent layer={layer} key={index} />
								))}
							</CardContent>
							<CardFooter className="flex justify-end p-1">
								<Button variant="outline" size="icon">
									<Plus className="h-4 w-4" />
								</Button>
							</CardFooter>
						</CardHeader>
					</Card>
				</TabsContent>

				<TabsContent value="network" className="hidden lg:block">
					<div className="grid w-full grid-cols-2 gap-6">
						<Card>
							<CardHeader>
								<CardTitle>Generator</CardTitle>
								<CardDescription>
									Network architecture for generator neural net.
								</CardDescription>
								<CardContent className="space-y-4 p-0">
									{genLayers.map((layer, index) => (
										<LayerComponent layer={layer} key={index} />
									))}
								</CardContent>
								<CardFooter className="flex justify-end p-1">
									{/* <CreateLayerModal
										layers={genLayers}
										setLayers={setGenLayers}
									/> */}
								</CardFooter>
							</CardHeader>
						</Card>
						<Card>
							<CardHeader>
								<CardTitle>Discriminator</CardTitle>
								<CardDescription>
									Network architecture for discriminator neural net.
								</CardDescription>
								<CardContent className="space-y-4 p-0">
									{discLayers.map((layer, index) => (
										<LayerComponent layer={layer} key={index} />
									))}
								</CardContent>
								<CardFooter className="flex justify-end p-1">
									{/* <CreateLayerModal
										layers={discLayers}
										setLayers={setDiscLayers}
									/> */}
								</CardFooter>
							</CardHeader>
						</Card>
					</div>
				</TabsContent>

				<TabsContent value="hyperparameters">Squishy</TabsContent>
			</Tabs>
		</div>
		// <Tabs defaultValue="account" className="w-[400px]">
		// 	<TabsList className="grid w-full grid-cols-2">
		// 		<TabsTrigger value="account">Account</TabsTrigger>
		// 		<TabsTrigger value="password">Password</TabsTrigger>
		// 	</TabsList>
		// 	<TabsContent value="account">
		// 		<Card>
		// 			<CardHeader>
		// 				<CardTitle>Account</CardTitle>
		// 				<CardDescription>
		// 					Make changes to your account here. Click save when you're done.
		// 				</CardDescription>
		// 			</CardHeader>
		// 			<CardContent className="space-y-2">
		// 				<div className="space-y-1">
		// 					<Label htmlFor="name">Name</Label>
		// 					<Input id="name" defaultValue="Pedro Duarte" />
		// 				</div>
		// 				<div className="space-y-1">
		// 					<Label htmlFor="username">Username</Label>
		// 					<Input id="username" defaultValue="@peduarte" />
		// 				</div>
		// 			</CardContent>
		// 			<CardFooter>
		// 				<Button>Save changes</Button>
		// 			</CardFooter>
		// 		</Card>
		// 	</TabsContent>
		// 	<TabsContent value="password">
		// 		<Card>
		// 			<CardHeader>
		// 				<CardTitle>Password</CardTitle>
		// 				<CardDescription>
		// 					Change your password here. After saving, you'll be logged out.
		// 				</CardDescription>
		// 			</CardHeader>
		// 			<CardContent className="space-y-2">
		// 				<div className="space-y-1">
		// 					<Label htmlFor="current">Current password</Label>
		// 					<Input id="current" type="password" />
		// 				</div>
		// 				<div className="space-y-1">
		// 					<Label htmlFor="new">New password</Label>
		// 					<Input id="new" type="password" />
		// 				</div>
		// 			</CardContent>
		// 			<CardFooter>
		// 				<Button>Save password</Button>
		// 			</CardFooter>
		// 		</Card>
		// 	</TabsContent>
		// </Tabs>
	);
}
