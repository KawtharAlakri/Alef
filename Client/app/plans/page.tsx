'use client'
import React, { useEffect, useState } from "react";
import { Plan } from "../../types/plan"
import { getPlans } from "../../services/planService"
import Link from "next/link";
const SubscriptionPlansPage = () => {
    const [plans, setPlans] = useState<Plan[]>([]);

    useEffect(() => {
        async function fetchPlans() {
            try {
                const usersData = await getPlans();
                setPlans(usersData);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }

        fetchPlans();
    }, []);

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="grid grid-cols-3 gap-4">
                {plans.map((plan, index) => (
                    <div
                        key={index}
                        className="bg-white p-6 rounded-lg shadow-lg text-center"
                    >
                        <h2 className="text-2xl font-bold mb-4">{plan.plan_name}</h2>
                        <p className="text-xl mb-4">{plan.monthly_price}</p>
                        <ul className="list-disc text-left mb-4">
                            {plan.plan_description}
                        </ul>
                        <Link
                            href={`/plans/${plan.id}`}
                            className="inline-flex items-center justify-center bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                        >
                            Subscribe
                        </Link>

                        {/* <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => handleRegisterClick(plan.id)}
                        >
                            Register in this plan
                        </button> */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SubscriptionPlansPage;