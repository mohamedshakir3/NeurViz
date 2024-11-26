import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuItem,
} from "@/components/ui/sidebar";

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
