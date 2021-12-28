from multiprocessing import Pool
import random
from datetime import datetime


def generate_files(n):
     with open(f"output{n}.txt", "w") as f:
        for i in range(10000):
            f.write(f"{n} - {''.join(random.choices(data, k=m))}\n")


def override_files(n):
    with open(f"output{n}.txt", "r") as source, open(f"result.txt", "a") as dest:
        dest.write(''.join(source.readlines()))


def calc_results(func, n):
    dt = datetime.now()
    results = threads.map(func, [i for i in range(1, n + 1)])
    return (datetime.now() - dt).total_seconds()


data = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

m = 10
threads = Pool(11)

# generate_files(1)
print(f"generating files took {calc_results(generate_files, 11)} sec")
print(f"reading took {calc_results(override_files, 11)} sec")
