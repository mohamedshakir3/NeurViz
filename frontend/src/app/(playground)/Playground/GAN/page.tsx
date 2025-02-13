import { History, ChevronRight, Play } from "lucide-react"
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip"

import { Button } from "@/components/ui/button"
import { Fragment } from "react"
import {
	Noise,
	ReLU,
	Conv,
	Dense,
	Tanh,
	Sigmoid,
	LeakyReLU,
} from "@/components/LayerSvg"

import { Separator } from "@/components/ui/separator"

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"

import CodeViewer from "./components/code-viewer"
import { NoiseDimSelector } from "./components/noisedim-selector"
import { PresetSave } from "./components/preset-save"
import { PresetSelector, presets } from "./components/preset-selector"
import { PresetShare } from "./components/preset-share"
import { LearningSelector } from "./components/learning-selector"
import { EpochSelector } from "./components/epoch-selector"
import { useGan } from "@/components/GanProvider"
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion"
import Playground from "./components/playground"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"

import CreateLayerModal from "@/components/CreateLayerModal"
import { getCurrentUser } from "@/lib/auth-actions"

// TODO: Break apart playground component
export default async function PlaygroundPage() {
	return <Playground />
}
