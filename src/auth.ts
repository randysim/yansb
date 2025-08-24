import { DrizzleAdapter } from '@auth/drizzle-adapter'
import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import db from './db'
import { accounts, users, sessions, settings, subscriptions } from './db/schema'
import { Provider } from 'next-auth/providers'
import { eq } from 'drizzle-orm'

const providers: Provider[] = [Google]

export const providerMap = providers
    .map((provider) => {
        if (typeof provider === 'function') {
            const providerData = provider()
            return { id: providerData.id, name: providerData.name }
        } else {
            return { id: provider.id, name: provider.name }
        }
    })
    .filter((provider) => provider.id !== 'credentials')

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: DrizzleAdapter(db, {
        usersTable: users,
        accountsTable: accounts,
        sessionsTable: sessions,
    }),
    providers,
    pages: {
        signIn: '/signin',
    },
    callbacks: {
        async session({ session }) {
            if (session.user?.id) {
                const dataRows = await db
                    .select()
                    .from(settings)
                    .leftJoin(subscriptions, eq(settings.customerId, subscriptions.customerId))
                    .where(eq(settings.userId, session.user.id))
                    .limit(1)

                if (dataRows.length > 0) {
                    const data = dataRows[0]
                    session.user = {
                        ...session.user,
                        setting: data.settings,
                        subscription: data.subscriptions || null,
                    }
                }
            }

            return session
        },
    },
})
