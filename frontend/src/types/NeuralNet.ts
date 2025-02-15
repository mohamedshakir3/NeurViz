export type BaseLayer = {
	type: string
}
export interface DenseLayer extends BaseLayer {
	in_channels: number
	out_channels: number
	activation: string
}

export interface ConvLayer extends BaseLayer {
	in_channels: number
	out_channels: number
	kernel: number
	stride: number
	activation: string
}

export type Epoch = {
	id: number
	gen_loss: number
	disc_loss: number
}

export type Layer = DenseLayer | ConvLayer
// TODO: Fix all the types and create types/interfaces for remaining layer types and components
