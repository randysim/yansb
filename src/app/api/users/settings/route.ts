import { auth } from '@/auth'
import { eq } from 'drizzle-orm'
import db from '@/db'
import { settings } from '@/db/schema'

type SettingsResponse = {
    settings: {
        dob: Date
        yoe: number
    }
}

export async function GET() {
    const session = await auth()

    if (!session || !session.user || !session.user.id) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
    }

    const settingsRows = await db.select().from(settings).where(eq(settings.userId, session.user.id))

    if (settingsRows.length === 0) {
        return new Response(JSON.stringify({ settings: null }), { status: 200 })
    }

    const userSettings = settingsRows[0]

    const settingsResponse: SettingsResponse = {
        settings: {
            dob: userSettings.dob,
            yoe: userSettings.yoe,
        },
    }

    return new Response(JSON.stringify(settingsResponse), { status: 200 })
}

export async function POST(request: Request) {
    const session = await auth()

    if (!session || !session.user || !session.user.id) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
    }

    const { settings: newSettings } = await request.json()

    if (!newSettings) {
        return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400 })
    }

    const { nextjsFirstTime, dob, yoe } = newSettings

    await db.insert(settings).values({
        userId: session.user.id,
        nextjsFirstTime,
        dob: new Date(dob),
        yoe,
    })

    return new Response(JSON.stringify({ success: true }), { status: 201 })
}

export async function PATCH(request: Request) {
    const session = await auth()

    if (!session || !session.user || !session.user.id) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
    }

    const { settings: newSettings } = await request.json()

    if (!newSettings) {
        return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400 })
    }

    await db
        .update(settings)
        .set({
            ...newSettings,
        })
        .where(eq(settings.userId, session.user.id))

    return new Response(JSON.stringify({ success: true }), { status: 200 })
}
