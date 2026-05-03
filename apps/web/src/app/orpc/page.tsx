"use client";

import {useEffect} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useMutation, useQuery} from "@tanstack/react-query";
import {toast} from "sonner";

import {orpc} from "@/lib/orpc";
import {registerUserInput, type RegisterUserInput} from "@repo/contracts";
import {OrpcHero} from "@/components/orpc/hero";

const inputClass =
    "h-10 w-full rounded-lg border border-white/8 bg-white/4 px-3.5 text-sm text-[#fafafa] placeholder:text-[#555] outline-none transition-colors duration-150 hover:border-white/12 focus:border-orange-500/40 focus:bg-white/[0.06] focus:ring-2 focus:ring-orange-500/20 aria-invalid:border-red-500/40 aria-invalid:ring-2 aria-invalid:ring-red-500/15";

export default function Page() {
    const {
        register,
        handleSubmit,
        reset,
        setFocus,
        formState: {errors, isSubmitting},
    } = useForm<RegisterUserInput>({
        resolver: zodResolver(registerUserInput),
        mode: "onBlur",
        defaultValues: {
            name: "",
            email: ""
        },
    });

    const registerMutation = useMutation(
        orpc.users.registerUser.mutationOptions({
            onSuccess: (data) => {
                toast.success(data.text);
                reset();
            },
            onError: (error) => {
                toast.error(error.message ?? "Registration failed");
            },
        })
    );

    const {data: userData, isFetching: isFetchingUser} = useQuery(
        orpc.users.getUser.queryOptions({
            input: {id: registerMutation.data?.text as string},
            enabled: !!registerMutation.data?.text,
        })
    );

    const onSubmit = handleSubmit((values) => {
            return registerMutation.mutateAsync(values)
        }
    );

    useEffect(() => {
        const firstError = Object.keys(errors)[0] as
            | keyof RegisterUserInput
            | undefined;
        if (firstError) {
            setFocus(firstError);
        }
    }, [errors, setFocus]);

    return (
<>
            <OrpcHero/>

            {/* Form */}
            <section className="relative">
                <div className="mx-auto max-w-2xl px-6 py-16">
                    <form
                        onSubmit={onSubmit}
                        noValidate
                        aria-busy={isSubmitting}
                        className="rounded-xl border border-white/6 bg-white/2 p-6 sm:p-8 transition-colors duration-300 hover:border-white/12"
                    >
                        <fieldset disabled={isSubmitting} className="flex flex-col gap-6">
                            <legend className="sr-only">Account details</legend>

                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="name"
                                    className="text-xs font-medium text-[#ccc]"
                                >
                                    Name <span className="text-orange-400" aria-hidden>*</span>
                                </label>
                                <input
                                    id="name"
                                    autoComplete="name"
                                    placeholder="Jane Doe"
                                    aria-invalid={!!errors.name}
                                    aria-describedby={
                                        errors.name ? "name-error" : "name-hint"
                                    }
                                    className={inputClass}
                                    {...register("name")}
                                />
                                {errors.name ? (
                                    <p
                                        id="name-error"
                                        role="alert"
                                        className="text-[12px] leading-relaxed text-red-400"
                                    >
                                        {errors.name.message}
                                    </p>
                                ) : (
                                    <p
                                        id="name-hint"
                                        className="text-[12px] leading-relaxed text-[#666]"
                                    >
                                        Display name (2–40 characters).
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="email"
                                    className="text-xs font-medium text-[#ccc]"
                                >
                                    Email <span className="text-orange-400" aria-hidden>*</span>
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    inputMode="email"
                                    autoComplete="email"
                                    placeholder="jane@example.com"
                                    aria-invalid={!!errors.email}
                                    aria-describedby={
                                        errors.email ? "email-error" : undefined
                                    }
                                    className={inputClass}
                                    {...register("email")}
                                />
                                {errors.email && (
                                    <p
                                        id="email-error"
                                        role="alert"
                                        className="text-[12px] leading-relaxed text-red-400"
                                    >
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>

                        </fieldset>

                        <div
                            className="mt-8 flex flex-col-reverse items-stretch justify-end gap-3 sm:flex-row sm:items-center">
                            <button
                                type="button"
                                onClick={() => reset()}
                                disabled={isSubmitting}
                                className="inline-flex h-10 cursor-pointer items-center justify-center rounded-lg border border-white/10 bg-white/4 px-5 text-sm font-medium text-[#ccc] transition-all duration-200 hover:border-white/20 hover:bg-white/[0.07] hover:text-white disabled:pointer-events-none disabled:opacity-50"
                            >
                                Reset
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg bg-linear-to-b from-orange-500 to-orange-600 px-5 text-sm font-medium text-white shadow-[0_1px_2px_rgba(0,0,0,0.3),0_0_16px_rgba(249,115,22,0.25)] transition-all duration-200 hover:shadow-[0_1px_2px_rgba(0,0,0,0.3),0_0_24px_rgba(249,115,22,0.4)] hover:brightness-110 disabled:pointer-events-none disabled:opacity-60"
                            >
                                {isSubmitting && (
                                    <svg
                                        className="size-3.5 animate-spin"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                    >
                                        <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                                    </svg>
                                )}
                                {isSubmitting ? "Submitting…" : "Register"}
                            </button>
                        </div>
                    </form>

                    {registerMutation.isSuccess && (
                        <section
                            aria-live="polite"
                            className="mt-6 overflow-hidden rounded-xl border border-orange-500/15 bg-orange-500/4 p-5"
                        >
                            <div className="flex items-start gap-3">
                                <div
                                    className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-linear-to-b from-orange-500 to-orange-600 shadow-[0_0_10px_rgba(249,115,22,0.2)]">
                                    <svg
                                        className="size-3.5 text-white"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <polyline points="20 6 9 17 4 12"/>
                                    </svg>
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-medium text-[#eee]">
                                        {registerMutation.data.text}
                                    </p>
                                    <p className="mt-1 text-[13px] leading-relaxed text-[#888]">
                                        {isFetchingUser
                                            ? "Loading follow-up greeting…"
                                            : userData?.text}
                                    </p>
                                </div>
                            </div>
                        </section>
                    )}
                </div>
            </section>
        </>
    );
}
