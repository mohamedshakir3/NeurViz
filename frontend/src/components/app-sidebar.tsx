import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuAction,
	SidebarMenuSubItem,
} from "@/components/ui/sidebar";

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
	GeneratorMenuItem,
	DiscriminatorMenuItem,
} from "@/components/NetworkSidebarItem";
import Hyperparameters from "./Hyperparameters";
import PretrainedModelSelector from "./PretrainedModelSelector";
import TrainModel from "@/components/TrainModelButton";

export function AppSidebar() {
	return (
		<Sidebar>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Network Architecture</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<GeneratorMenuItem />
							<DiscriminatorMenuItem />
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
				<SidebarGroup>
					<SidebarGroupLabel>Hyperparameters</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<Hyperparameters />
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
				<SidebarMenu>
					<SidebarMenuItem className="flex justify-between flex-wrap gap-3 pr-5 pl-5">
						<PretrainedModelSelector />
						<TrainModel />
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarContent>
		</Sidebar>
	);
}
