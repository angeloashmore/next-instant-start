import { type Metadata } from "next"

import { SliceZone } from "@prismicio/react"

import { Footer } from "@/components/Footer"
import { createClient } from "@/prismicio.tenant"
import { components } from "@/slices"

export default async function Home(props: PageProps<"/[tenant]">) {
	const { tenant } = await props.params
	const client = createClient(tenant)
	const page = await client.getSingle("homepage")

	return (
		<>
			<SliceZone slices={page.data.slices} components={components} />
			<Footer data={page.data} />
		</>
	)
}

export async function generateMetadata(
	props: PageProps<"/[tenant]">,
): Promise<Metadata> {
	const { tenant } = await props.params
	const client = createClient(tenant)
	const page = await client.getSingle("homepage")

	return {
		title: page.data.meta_title,
		description: page.data.meta_description,
	}
}
