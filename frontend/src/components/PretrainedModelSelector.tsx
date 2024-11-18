"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { usePathname } from "next/navigation";

const models = [
	{
		value: "dcgan",
		label: "DCGAN",
	},
	{
		value: "srgan",
		label: "SRGAN",
	},
	{
		value: "progan",
		label: "ProGAN",
	},
	{
		value: "wgan",
		label: "WGAN",
	},
	{
		value: "wgangp",
		label: "WGAN-GP",
	},
];

export default function PretrainedModelSelector() {
	const [open, setOpen] = React.useState(false);
	const [value, setValue] = React.useState("");
	const pathName = usePathname();
	const isGAN = pathName == "/GAN";

	return isGAN ? (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-[200px] justify-between"
				>
					{value
						? models.find((model) => model.value === value)?.label
						: "Pretrained Models..."}
					<ChevronsUpDown className="opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0">
				<Command>
					<CommandInput placeholder="Search model..." className="h-9" />
					<CommandList>
						<CommandEmpty>No model found.</CommandEmpty>
						<CommandGroup>
							{models.map((model) => (
								<CommandItem
									key={model.value}
									value={model.value}
									onSelect={(currentValue) => {
										setValue(currentValue === value ? "" : currentValue);
										setOpen(false);
									}}
								>
									{model.label}
									<Check
										className={cn(
											"ml-auto",
											value === model.value ? "opacity-100" : "opacity-0"
										)}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	) : (
		""
	);
}