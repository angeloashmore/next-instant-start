import {
	createClient as baseCreateClient,
	type ClientConfig,
} from "@prismicio/client"
import { enableAutoPreviews } from "@prismicio/next"
import { notFound } from "next/navigation"

import prismicConfig from "../prismic.config.json"

const ALLOWED_HOSTS = [
	"prismic.io",
	"wroom.io",
	"wroom.test",
	"dev-tools-wroom.com",
	"devops-wroom.com",
	"marketing-tools-wroom.com",
	"platform-wroom.com",
]

export const createClient = (tenant: string, config: ClientConfig = {}) => {
	const [repo, ...rest] = tenant.split("~")
	const host = rest.join(".") || "prismic.io"
	if (!repo || !ALLOWED_HOSTS.includes(host)) notFound()

	const client = baseCreateClient(repo, {
		documentAPIEndpoint: `https://${repo}.cdn.${host}/api/v2`,
		routes: prismicConfig.routes.map((route) => ({
			...route,
			path: route.path === "/" ? `/${tenant}` : `/${tenant}${route.path}`,
		})),
		fetch: (url, init) => {
			const u = new URL(url)
			u.searchParams.set("x-instant-start", tenant)
			return fetch(u, init)
		},
		...config,
	})

	enableAutoPreviews({ client })

	return client
}
