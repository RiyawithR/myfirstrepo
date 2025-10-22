import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from './icons';

const guides = [
    {
        title: 'First Aid: Severe Bleeding',
        content: `
            <ul>
                <li><strong>1. Call for Help:</strong> Immediately call your local emergency number.</li>
                <li><strong>2. Apply Pressure:</strong> Use a clean cloth or bandage to apply firm, direct pressure to the wound.</li>
                <li><strong>3. Elevate:</strong> If the wound is on a limb, elevate it above the heart if possible.</li>
                <li><strong>4. Don't Remove Object:</strong> If an object is embedded in the wound, do not remove it. Apply pressure around it.</li>
                <li><strong>5. Wait for Help:</strong> Continue applying pressure until emergency services arrive.</li>
            </ul>
        `
    },
    {
        title: 'First Aid: Burns (Minor)',
        content: `
            <ul>
                <li><strong>1. Cool the Burn:</strong> Hold the burned area under cool (not cold) running water for about 10-15 minutes.</li>
                <li><strong>2. Remove Jewelry:</strong> Gently remove rings or other tight items from the burned area.</li>
                <li><strong>3. Don't Break Blisters:</strong> If blisters form, do not break them as this can lead to infection.</li>
                <li><strong>4. Apply Lotion:</strong> Once cooled, apply a moisturizing lotion, like one with aloe vera.</li>
                <li><strong>5. Bandage:</strong> Cover the burn with a sterile gauze bandage (not fluffy cotton).</li>
            </ul>
            <p class="mt-2"><strong>Seek medical attention for burns that are large, deep, or on the hands, feet, face, or genitals.</strong></p>
        `
    },
    {
        title: 'First Aid: Choking (Adult)',
        content: `
            <p>If the person can cough or speak, encourage them to keep coughing.</p>
            <p>If they cannot breathe, cough, or speak, perform the <strong>Heimlich Maneuver (Abdominal Thrusts)</strong>:</p>
            <ul>
                <li><strong>1. Stand Behind:</strong> Stand behind the person and wrap your arms around their waist.</li>
                <li><strong>2. Make a Fist:</strong> Make a fist with one hand. Place it slightly above their navel.</li>
                <li><strong>3. Grasp and Thrust:</strong> Grasp the fist with your other hand. Press hard into the abdomen with a quick, upward thrust — as if trying to lift the person up.</li>
                <li><strong>4. Repeat:</strong> Perform thrusts until the object is expelled.</li>
            </ul>
        `
    },
    {
        title: 'Recognizing a Stroke (F.A.S.T.)',
        content: `
            <p>Use the F.A.S.T. test to check for common symptoms of a stroke:</p>
            <ul>
                <li><strong>F - Face Drooping:</strong> Does one side of the face droop or is it numb? Ask the person to smile. Is the smile uneven?</li>
                <li><strong>A - Arm Weakness:</strong> Is one arm weak or numb? Ask the person to raise both arms. Does one arm drift downward?</li>
                <li><strong>S - Speech Difficulty:</strong> Is speech slurred? Is the person unable to speak or hard to understand?</li>
                <li><strong>T - Time to Call Emergency Services:</strong> If someone shows any of these symptoms, even if the symptoms go away, call emergency services and get the person to a hospital immediately.</li>
            </ul>
        `
    }
];

const OfflineGuide: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="max-w-lg mx-auto">
            <div className="p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 rounded-r-lg mb-6">
                <h3 className="font-bold">You are Offline</h3>
                <p>The AI Chatbot is unavailable. Here are some basic guides for immediate help. Always call emergency services for serious situations.</p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Offline Emergency Guides</h2>
                <div className="space-y-2">
                    {guides.map((guide, index) => (
                        <div key={index} className="border rounded-md overflow-hidden">
                            <button
                                onClick={() => toggleAccordion(index)}
                                className="w-full flex justify-between items-center p-4 text-left font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none"
                            >
                                <span>{guide.title}</span>
                                {activeIndex === index ? <ChevronUpIcon className="w-5 h-5" /> : <ChevronDownIcon className="w-5 h-5" />}
                            </button>
                            {activeIndex === index && (
                                <div className="p-4 bg-white border-t">
                                    <div className="text-sm text-gray-600 prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: guide.content }} />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OfflineGuide;
