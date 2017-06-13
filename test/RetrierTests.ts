import * as Chai from 'chai';
import { suite, test } from 'mocha-typescript';
import { Retrier } from '../src/SN';
const expect = Chai.expect;

@suite('Retrier Tests')
export class RetrierTests{
        
        @test
        public async 'Simple Counter'(){
            let count = 0;
            await Retrier.Create(async () => {
                count = count + 1;
                return count === 3;
            }).Run();
            expect(count).to.be.eq(3);
        }

        @test
        public async 'onSuccess has been triggered'(){
            let triggered = false;
            await Retrier.Create(async () => true)
            .Setup({
                onSuccess: () => {
                    triggered = true;
                }
            }).Run()

            expect(triggered).to.be.eq(true);
        }

        @test
        public async 'onTimeout has been triggered'(){
            let triggered = false;
            await Retrier.Create(async () => false)
            .Setup({
                onFail: () => {
                    triggered = true;
                },
                timeoutMs: 1
            }).Run()

            expect(triggered).to.be.eq(true);
        }

        @test
        public async 'onTry has been triggered'(){
            let triggered = false;
            await Retrier.Create(async () => true)
                .Setup({
                    onTry: () => { 
                        triggered = true;
                    }
                })
                .Run();
            expect(triggered).to.be.eq(true);
        }


        @test
        public async 'exampleTest'(){
            const funcToRetry: () => Promise<boolean> = async () => {
                let hasSucceeded = false;
                // ...
                // custom logic
                // ...
                return hasSucceeded;
            }
            const retrierSuccess = await Retrier.Create(funcToRetry)
                .Setup({
                    retries: 3,
                    retryIntervalMs: 1,
                    timeoutMs: 1000
                })
                .Run();

            expect(retrierSuccess).to.be.eq(false);
        }
}