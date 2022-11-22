import React from 'react';
import Layout from '../components/Layout';

const About = () => {
    return (
        <Layout className="flex-col text-center">
            <h1 className="text-4xl text-center">About</h1>

            <p className="pt-12">
                So, managing expenses is hard. Most people have one income (or
                maybe few streams of income) but have many outgoings which makes
                tracking where you should budget for different things you have
                coming up, very difficult.
            </p>
            <p className="pt-4">
                I needed a simple way to input my salary, then tally up all of
                my expenses and find out how much I have left over. I also
                wanted to be able to see how much I have spent on expenses (to
                help try cutting back on unnecessary expenses) and also so that
                I could budget for things like holidays, car payments, etc.
            </p>
            <p className="pt-4">
                Im a developer, so naturally I decided to try create a solution
                to this problem myself. Normally, I will try to avoid
                reinventing the wheel, but in this screnario, there was a few
                new libraries I was wanting to try out for the first time, this
                allowed me to get a better feel for the said libraries
            </p>
            <span>Created With: </span>
            <ul className="pt-4 font-bold">
                <li>- tRPC</li>
                <li>- Tailwind CSS</li>
                <li>- Prisma</li>
                <li>- Zod</li>
                <li>- NextAuth</li>
            </ul>
        </Layout>
    );
};

export default About;
