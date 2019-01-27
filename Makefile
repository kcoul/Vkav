src = $(wildcard *.cpp)
obj = $(src:.cpp=.o)


CFLAGS = -std=c++17
LDFLAGS = -lglfw -lvulkan -lpulse -lpulse-simple -lpthread

ifeq ($(BUILD),debug)
CFLAGS += -O0 -Wall -ggdb
else
CFLAGS += -DNDEBUG -O3 -march=native
STRIP = strip --strip-all Vkav
endif

all: compile run clean

%.o: %.cpp
	$(CXX) $(CFLAGS) -c -o $@ $^

compile: $(obj)
	$(CXX) $(CFLAGS) -o Vkav $(obj) $(LDFLAGS)
	$(STRIP)

run:
	./Vkav

clean:
	rm -f Vkav $(obj)
