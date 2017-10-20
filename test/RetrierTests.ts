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
                OnSuccess: () => {
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
                OnFail: () => {
                    triggered = true;
                },
                TimeoutMs: 1
            }).Run()

            expect(triggered).to.be.eq(true);
        }

        @test
        public async 'onTry has been triggered'(){
            let triggered = false;
            await Retrier.Create(async () => true)
                .Setup({
                    OnTry: () => {
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
                    Retries: 3,
                    RetryIntervalMs: 1,
                    TimeoutMs: 1000
                })
                .Run();

            expect(retrierSuccess).to.be.eq(false);
        }

        @test
        public async 'Should throw error when started twice'(){
            const retrier = Retrier.Create(async () => {return false; });

            retrier.Run();

            try {
                await retrier.Run();
                throw new Error('Should have failed.');
            } catch (error) {
                //
            }
        }

        @test
        public 'Should throw error when trying to set up after started'(){
            const retrier = Retrier.Create(async () => {return false; });
            retrier.Run();
            expect(() => {
                retrier.Setup({
                    Retries: 2
                })
            }).to.throw();
        }
}