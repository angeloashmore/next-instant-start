import { type Metadata } from "next"

import { SliceZone } from "@prismicio/react"

import { Footer } from "@/components/Footer"
import { createClient } from "@/prismicio"
import { components } from "@/slices"

import type { HomepageDocument } from "../../prismicio-types"

export default async function Home() {
	const client = createClient()
	const page = await client.getSingle<HomepageDocument>("homepage")

	return (
		<>
			<SliceZone slices={page.data.slices} components={components} />
			<Footer data={page.data} />
		</>
	)
}

export async function generateMetadata(): Promise<Metadata> {
	const client = createClient()
	const page = await client.getSingle<HomepageDocument>("homepage")

	return {
		title: page.data.meta_title,
		description: page.data.meta_description,
	}
}
