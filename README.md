# gpt-oss-20b on a NVIDIA RTX A5000 Laptop GPU

This project exists to show that running generative AI for coding
on a locale device is possible.

All the react typescript code in this repo is builded with gpt-oss-20b.
Checkout the generated branch to see it.

## download aider
https://github.com/Aider-AI/aider

> Read the documentation and use the conf.yml file format :D

## download llama.cpp
https://github.com/ggml-org/llama.cpp

## build llama.cpp

```bash

#!/bin/sh

cmake -B build -DGGML_CUDA=ON
cmake --build build --config Release -j <number_of_cores>

```

## how to run with llama.cpp (inference settings)
https://docs.unsloth.ai/basics/gpt-oss-how-to-run-and-fine-tune

## download the model gguf file
https://huggingface.co/ggml-org/gpt-oss-20b-GGUF

## run it :)

```bash
#!/bin/sh

llama-server \
    --alias gpt-oss-20b \
    --port 8180 \
    -c 16384 \
    --offline \
    --jinja \
    --threads 1 \
    -fa \
    --top-p 1.0 \
    --top-k 0 \
    --temp 1.0 \
    --repeat-penalty 1.05 \
    --min-p 0 \
    -ngl 25 \
    -m /path/to/modelfile/gpt-oss-20b-mxfp4.gguf
```
