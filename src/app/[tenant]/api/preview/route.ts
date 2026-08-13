import { redirectToPreviewURL } from "@prismicio/next"
import { NextRequest } from "next/server"

import { createClient } from "@/prismicio.tenant"

export async function GET(
	request: NextRequest,
	context: RouteContext<"/[tenant]/api/preview">,
) {
	const { tenant } = await context.params
	const client = createClient(tenant)

	return await redirectToPreviewURL({ client, request })
}
