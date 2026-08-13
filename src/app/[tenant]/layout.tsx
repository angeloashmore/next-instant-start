import { PrismicPreview } from "@prismicio/next"

export default async function TenantLayout(props: LayoutProps<"/[tenant]">) {
	const { tenant } = await props.params
	const [repo] = tenant.split("~")

	return (
		<>
			{props.children}
			<PrismicPreview
				repositoryName={repo}
				updatePreviewURL={`/${tenant}/api/preview`}
			/>
		</>
	)
}
