"use client"
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

type OnboardFields = {
    nextjsFirstTime?: boolean;
    dob?: Date;
    yoe?: number;
}

export default function OnboardManager() {
    const [page, setPage] = useState(0);
    const [fields, setFields] = useState<OnboardFields>({});
    const router = useRouter();

    const forms = [
        {
            validate: () => {
                return fields.nextjsFirstTime !== undefined;
            },
            content: (
                <>
                    <h1 className="text-2xl font-semibold text-foreground tracking-wide px-4">
                        Is this your first time using Next.js?
                    </h1>

                    <div className="space-x-4">
                        <Button
                            className="px-8"
                            variant={fields.nextjsFirstTime === true ? "default" : "outline"} 
                            onClick={() => setFields({ ...fields, nextjsFirstTime: true })}
                        >
                            Yes
                        </Button>
                        <Button
                            className="px-8"
                            variant={fields.nextjsFirstTime === false ? "default" : "outline"}
                            onClick={() => setFields({ ...fields, nextjsFirstTime: false })}
                        >
                            No
                        </Button>
                    </div>
                </>
            )
        },
        {
            validate: () => {
                return fields.dob !== undefined
            },
            content: (
                <>
                    <h1 className="text-2xl font-semibold text-foreground tracking-wide px-4">
                        What is your date of birth?

                        <div className="py-4">
                            <DatePicker onSelect={date => setFields({ ...fields, dob: date })} />
                        </div>
                    </h1>
                </>
            )
        },
        {
            validate: () => {
                return fields.yoe !== undefined && isNaN(fields.yoe) === false;
            },
            content: (
                <>
                    <h1 className="text-2xl font-semibold text-foreground tracking-wide px-4">
                        What is your years of experience?
                    </h1>

                    <div className="py-4">
                        <Input
                            type="number"
                            value={fields.yoe || 0}
                            onChange={e => setFields({ ...fields, yoe: Number(e.target.value) })}
                            className="border border-input rounded-md p-2 w-full"
                        />
                    </div>
                </>
            )
        }
    ]

    const submit = async () => {
        const res = await fetch("/api/users/settings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                settings: {
                    nextjsFirstTime: fields.nextjsFirstTime,
                    dob: fields.dob,
                    yoe: fields.yoe
                }
            })
        });

        if (!res.ok) {
            console.error("Failed to submit settings");
            return;
        }

        // Redirect to dashboard or show success message
        router.push("/dashboard");
    }

    return (
        <Card className="w-full mx-4 max-w-2xl flex flex-col items-center">
            {
                forms[page].content
            }

            <div className="w-full flex flex-row-reverse pr-4 mt-8">
                {
                    page === forms.length - 1 ? 
                    <Button
                        onClick={submit}
                        disabled={!forms[page].validate()}
                    >
                        Submit
                    </Button> : 
                    <Button
                        onClick={() => setPage(page + 1)}
                        disabled={!forms[page].validate()}
                    >
                        Next
                    </Button>
                }
            </div>
        </Card>
    );
}