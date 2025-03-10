"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { PopoverProps } from "@radix-ui/react-popover"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"

interface PresetSelectorProps extends PopoverProps {
	presets: Preset[]
}

export function PresetSelector({ presets, ...props }: PresetSelectorProps) {
	const [open, setOpen] = React.useState(false)
	const [selectedPreset, setSelectedPreset] = React.useState<Preset>()
	return (
		<Popover open={open} onOpenChange={setOpen} {...props}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-label="Load a preset..."
					aria-expanded={open}
					className="flex-1 justify-between md:max-w-[200px] lg:max-w-[300px]"
				>
					{selectedPreset ? selectedPreset.name : "Load a preset..."}
					<ChevronsUpDown className="opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[300px] p-0">
				<Command>
					<CommandInput placeholder="Search presets..." />
					<CommandList>
						<CommandEmpty>No presets found.</CommandEmpty>
						<CommandGroup heading="Presets">
							{presets.map((preset) => (
								<CommandItem
									key={preset.id}
									onSelect={() => {
										setSelectedPreset(preset)
										setOpen(false)
									}}
								>
									{preset.name}
									<Check
										className={cn(
											"ml-auto",
											selectedPreset?.id === preset.id
												? "opacity-100"
												: "opacity-0"
										)}
									/>
								</CommandItem>
							))}
						</CommandGroup>
						<CommandGroup heading="Saved"></CommandGroup>
						{/* <CommandGroup className="pt-0"> */}
						{/* <CommandItem onSelect={() => router.push("/examples")}> */}
						{/* More examples */}
						{/* </CommandItem> */}
						{/* </CommandGroup> */}
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}

export interface Preset {
	id: string
	name: string
}

export const presets: Preset[] = [
	{
		id: "9cb0e66a-9937-465d-a188-2c4c4ae2401f",
		name: "WGAN",
	},
	{
		id: "61eb0e32-2391-4cd3-adc3-66efe09bc0b7",
		name: "ProGan",
	},
	{
		id: "cc198b13-4933-43aa-977e-dcd95fa30770",
		name: "DCGAN",
	},
	{
		id: "adfa95be-a575-45fd-a9ef-ea45386c64de",
		name: "Conditional GAN",
	},
	{
		id: "c569a06a-0bd6-43a7-adf9-bf68c09e7a79",
		name: "Pix2Pix",
	},
	{
		id: "15ccc0d7-f37a-4f0a-8163-a37e162877dc",
		name: "Cycle GAN",
	},
	{
		id: "4641ef41-1c0f-421d-b4b2-70fe431081f3",
		name: "SRGAN",
	},
	{
		id: "48d34082-72f3-4a1b-a14d-f15aca4f57a0",
		name: "ESRGAN",
	},
]
